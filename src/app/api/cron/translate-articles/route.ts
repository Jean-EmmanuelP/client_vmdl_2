import { NextResponse } from "next/server";
import { LinkupClient } from "linkup-sdk";
import { Octokit } from "@octokit/rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TARGET_LANGS: Array<{
  code: "en" | "it" | "es" | "ar" | "pt" | "de" | "zh";
  label: string;
  langName: string;
}> = [
  { code: "en", label: "English", langName: "English" },
  { code: "it", label: "Italian", langName: "Italiano" },
  { code: "es", label: "Spanish", langName: "Español" },
  { code: "ar", label: "Arabic", langName: "العربية" },
  { code: "pt", label: "Portuguese", langName: "Português" },
  { code: "de", label: "German", langName: "Deutsch" },
  { code: "zh", label: "Simplified Chinese", langName: "简体中文" },
];

const TRANSLATIONS_SCHEMA = {
  type: "object",
  properties: TARGET_LANGS.reduce(
    (acc, l) => {
      acc[l.code] = {
        type: "object",
        properties: {
          title: { type: "string", description: `Translated article title in ${l.label}, preserving meaning and SEO keywords (50-75 characters).` },
          excerpt: { type: "string", description: `Translated excerpt in ${l.label}, factual, 150-220 characters.` },
          metaDescription: { type: "string", description: `Translated meta description in ${l.label}, 140-155 characters.` },
          tags: {
            type: "array",
            items: { type: "string" },
            description: `Translated tags in ${l.label}, 3-5 items.`,
          },
          content: {
            type: "string",
            description: `Full article body translated into ${l.label}. Preserve Markdown: ## H2, ### H3, **bold**, - lists, > citations. Keep legal references intact (article numbers, court names, dates). Use professional legal language idiomatic to the target locale.`,
          },
        },
        required: ["title", "excerpt", "metaDescription", "tags", "content"],
      };
      return acc;
    },
    {} as Record<string, unknown>
  ),
  required: TARGET_LANGS.map((l) => l.code),
};

interface ArticleShape {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaDescription?: string;
  tags?: string[];
  publishedAt: string;
  author?: string;
  sources?: { name: string; url: string }[];
  translations?: Record<string, unknown>;
  [k: string]: unknown;
}

interface ContentJson {
  articles?: ArticleShape[];
  articles_drafts?: ArticleShape[];
  [k: string]: unknown;
}

function buildTranslationQuery(article: ArticleShape): string {
  return `You are a senior legal translator. Translate the following French legal blog article into 7 languages (English, Italian, Spanish, Arabic, Portuguese, German, Simplified Chinese).

Strict rules:
- Preserve every Markdown construct exactly (## H2, ### H3, **bold**, lists, > citations, numbered lists, line breaks).
- Keep all legal references untouched: article numbers (e.g. "art. L. 222-17"), arrêt numbers, dates, court names, party names, EU regulation numbers. Do NOT translate "Cour de cassation", "Conseil d'État", "FIFA", "UEFA" etc. Use the locally-accepted form when it exists (e.g. ECJ for CJUE in English).
- Use professional legal register idiomatic to each target locale.
- Keep the final sentence "Le cabinet VMDL accompagne ses clients sur ces problématiques." translated naturally in each language.
- Do NOT add commentary, do NOT shorten, do NOT skip sections.

ORIGINAL FRENCH ARTICLE
=======================

TITLE: ${article.title}

EXCERPT: ${article.excerpt}

META DESCRIPTION: ${article.metaDescription || ""}

TAGS: ${(article.tags || []).join(", ")}

CONTENT:
${article.content}

=======================

Return the structured object with all 7 translations conforming to the schema.`;
}

async function translateOne(article: ArticleShape): Promise<Record<string, unknown>> {
  const apiKey = process.env.LINKUP_API_KEY;
  if (!apiKey) throw new Error("LINKUP_API_KEY missing");
  const client = new LinkupClient({ apiKey });

  const response = await client.search({
    query: buildTranslationQuery(article),
    depth: "standard",
    outputType: "structured",
    structuredOutputSchema: TRANSLATIONS_SCHEMA,
  });
  const data = (response as unknown as { data: Record<string, unknown> }).data;
  if (!data) throw new Error("Linkup returned no data for translations");
  return data;
}

async function loadCms(): Promise<{
  cms: ContentJson;
  sha: string;
  octokit: Octokit;
  cmsRepoSha: string;
}> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;

  const resp = await octokit.repos.getContent({
    owner,
    repo: cmsRepo,
    path: cmsPath,
  });
  if (Array.isArray(resp.data) || resp.data.type !== "file") {
    throw new Error("CMS file not found");
  }
  const cms = JSON.parse(
    Buffer.from(resp.data.content, "base64").toString()
  ) as ContentJson;
  return { cms, sha: resp.data.sha, octokit, cmsRepoSha: resp.data.sha };
}

async function commitCms(cms: ContentJson, message: string) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;
  const currentRepo = process.env.GITHUB_CURRENT_REPO as string;
  const currentPath = process.env.GITHUB_CONTENT_CURRENT_PATH as string;

  const encoded = Buffer.from(JSON.stringify(cms, null, 2)).toString("base64");

  // Refetch sha right before write to minimise race
  const cmsResp = await octokit.repos.getContent({
    owner,
    repo: cmsRepo,
    path: cmsPath,
  });
  if (!Array.isArray(cmsResp.data) && cmsResp.data.type === "file") {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: cmsRepo,
      path: cmsPath,
      message,
      content: encoded,
      sha: cmsResp.data.sha,
    });
  }
  const curResp = await octokit.repos.getContent({
    owner,
    repo: currentRepo,
    path: currentPath,
  });
  if (!Array.isArray(curResp.data) && curResp.data.type === "file") {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: currentRepo,
      path: currentPath,
      message,
      content: encoded,
      sha: curResp.data.sha,
    });
  }
}

function articleNeedsTranslation(a: ArticleShape): boolean {
  if (!a.translations) return true;
  for (const l of TARGET_LANGS) {
    const t = a.translations[l.code] as { title?: string; content?: string } | undefined;
    if (!t || !t.title || !t.content) return true;
  }
  return false;
}

async function handle(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.LINKUP_API_KEY) {
    return NextResponse.json({ ok: false, error: "Missing LINKUP_API_KEY" }, { status: 503 });
  }

  const url = new URL(req.url);
  const slugParam = url.searchParams.get("slug");
  const dryRun = url.searchParams.get("dryRun") === "1";

  try {
    const { cms } = await loadCms();
    const articles = Array.isArray(cms.articles) ? cms.articles : [];
    if (articles.length === 0) {
      return NextResponse.json({ ok: true, message: "no articles" });
    }

    let target: ArticleShape | undefined;
    if (slugParam) {
      target = articles.find((a) => a.slug === slugParam);
      if (!target) {
        return NextResponse.json({ ok: false, error: `slug not found: ${slugParam}` }, { status: 404 });
      }
    } else {
      // Oldest article (by publishedAt) needing translation
      target = articles
        .filter(articleNeedsTranslation)
        .sort((a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        )[0];
      if (!target) {
        return NextResponse.json({ ok: true, message: "all articles fully translated", count: articles.length });
      }
    }

    const translations = await translateOne(target);

    if (dryRun) {
      return NextResponse.json({ ok: true, dryRun: true, slug: target.slug, langs: Object.keys(translations) });
    }

    // Merge: preserve existing FR (top-level fields are the FR canonical) + new translations
    const existing = (target.translations as Record<string, unknown>) || {};
    const merged: Record<string, unknown> = {
      ...existing,
      ...translations,
      // Also store FR explicitly so all 8 languages live under translations
      fr:
        (existing.fr as unknown) || {
          title: target.title,
          excerpt: target.excerpt,
          metaDescription: target.metaDescription || target.excerpt,
          tags: target.tags || [],
          content: target.content,
        },
    };

    // Re-load + write to minimise race
    const { cms: freshCms } = await loadCms();
    const freshArticles = Array.isArray(freshCms.articles) ? freshCms.articles : [];
    const idx = freshArticles.findIndex((a) => a.slug === target!.slug);
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "article disappeared during translation" }, { status: 500 });
    }
    freshArticles[idx] = { ...freshArticles[idx], translations: merged };
    freshCms.articles = freshArticles;
    await commitCms(
      freshCms,
      `i18n(articles): traductions multilingues pour « ${target.title.slice(0, 60)} »`
    );

    return NextResponse.json({
      ok: true,
      slug: target.slug,
      title: target.title,
      langsAdded: Object.keys(translations),
    });
  } catch (err) {
    console.error("[translate-articles] failed:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
