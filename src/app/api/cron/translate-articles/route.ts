import { NextResponse } from "next/server";
import { LinkupClient } from "linkup-sdk";
import { Octokit } from "@octokit/rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type TargetCode = "en" | "it" | "es" | "ar" | "pt" | "de" | "zh";

const TARGET_LANGS: Record<TargetCode, { label: string; locale: string }> = {
  en: { label: "English (United States)", locale: "en-US" },
  it: { label: "Italian", locale: "it-IT" },
  es: { label: "Spanish (Castilian)", locale: "es-ES" },
  ar: { label: "Arabic (Modern Standard)", locale: "ar" },
  pt: { label: "Portuguese (Portugal)", locale: "pt-PT" },
  de: { label: "German", locale: "de-DE" },
  zh: { label: "Simplified Chinese", locale: "zh-CN" },
};

function singleLangSchema(targetLabel: string) {
  return {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: `Translated title in ${targetLabel}, 50-75 characters, preserves SEO keywords.`,
      },
      excerpt: {
        type: "string",
        description: `Translated excerpt in ${targetLabel}, 150-220 characters, factual.`,
      },
      metaDescription: {
        type: "string",
        description: `Translated meta description in ${targetLabel}, 140-155 characters.`,
      },
      tags: {
        type: "array",
        items: { type: "string" },
        description: `3-5 translated tags in ${targetLabel}, first letter uppercase.`,
      },
      content: {
        type: "string",
        description: `Article body fully translated into ${targetLabel}. Preserve Markdown (## H2, ### H3, **bold**, - lists, > citations). Keep all legal references and numbers untouched (e.g. art. L. 222-17, CJUE C-650/22, FIFA, UEFA). Professional legal register idiomatic to the target locale.`,
      },
    },
    required: ["title", "excerpt", "metaDescription", "tags", "content"],
  };
}

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

function buildQuery(article: ArticleShape, targetLabel: string): string {
  return `Translate the following French legal blog article into ${targetLabel}.

Strict rules:
- Preserve every Markdown construct exactly (## H2, ### H3, **bold**, lists, > citations, line breaks).
- Keep all legal references untouched: article numbers (e.g. "art. L. 222-17"), arrêt numbers, dates, court names, party names, EU regulation numbers. Don't translate "Cour de cassation", "Conseil d'État", "FIFA", "UEFA". Use the locally-accepted form when it exists (e.g. ECJ for CJUE).
- Use professional legal register idiomatic to ${targetLabel}.
- Translate the final sentence "Le cabinet VMDL accompagne ses clients sur ces problématiques." naturally.
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

Return the structured object with the ${targetLabel} translation conforming to the schema.`;
}

async function translateOneLang(
  article: ArticleShape,
  code: TargetCode
): Promise<Record<string, unknown>> {
  const apiKey = process.env.LINKUP_API_KEY;
  if (!apiKey) throw new Error("LINKUP_API_KEY missing");
  const client = new LinkupClient({ apiKey });
  const target = TARGET_LANGS[code];

  const response = await client.search({
    query: buildQuery(article, target.label),
    depth: "standard",
    outputType: "structured",
    structuredOutputSchema: singleLangSchema(target.label),
  });
  // When includeSources is NOT set, Linkup returns the structured object
  // directly. When it IS set, it returns { data, sources }.
  const raw = response as unknown as
    | { data: Record<string, unknown> }
    | Record<string, unknown>;
  const data =
    "data" in raw && raw.data
      ? (raw.data as Record<string, unknown>)
      : (raw as Record<string, unknown>);
  if (!data || typeof data !== "object" || !data.title || !data.content) {
    throw new Error(
      `Linkup returned no usable data: ${JSON.stringify(response).slice(0, 300)}`
    );
  }
  return data;
}

async function loadCms(): Promise<ContentJson> {
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
  return JSON.parse(
    Buffer.from(resp.data.content, "base64").toString()
  ) as ContentJson;
}

async function commitCms(cms: ContentJson, message: string) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;
  const currentRepo = process.env.GITHUB_CURRENT_REPO as string;
  const currentPath = process.env.GITHUB_CONTENT_CURRENT_PATH as string;
  const encoded = Buffer.from(JSON.stringify(cms, null, 2)).toString("base64");

  const cmsResp = await octokit.repos.getContent({ owner, repo: cmsRepo, path: cmsPath });
  if (!Array.isArray(cmsResp.data) && cmsResp.data.type === "file") {
    await octokit.repos.createOrUpdateFileContents({
      owner, repo: cmsRepo, path: cmsPath, message, content: encoded, sha: cmsResp.data.sha,
    });
  }
  const curResp = await octokit.repos.getContent({ owner, repo: currentRepo, path: currentPath });
  if (!Array.isArray(curResp.data) && curResp.data.type === "file") {
    await octokit.repos.createOrUpdateFileContents({
      owner, repo: currentRepo, path: currentPath, message, content: encoded, sha: curResp.data.sha,
    });
  }
}

function nextMissing(article: ArticleShape): TargetCode | null {
  const t = article.translations || {};
  for (const code of Object.keys(TARGET_LANGS) as TargetCode[]) {
    const v = t[code] as { title?: string; content?: string } | undefined;
    if (!v || !v.title || !v.content) return code;
  }
  return null;
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
  const langParam = url.searchParams.get("lang") as TargetCode | null;
  const dryRun = url.searchParams.get("dryRun") === "1";

  try {
    const cms = await loadCms();
    const articles = Array.isArray(cms.articles) ? cms.articles : [];
    if (articles.length === 0) {
      return NextResponse.json({ ok: true, message: "no articles" });
    }

    // Pick article
    let target: ArticleShape | undefined;
    if (slugParam) {
      target = articles.find((a) => a.slug === slugParam);
      if (!target) {
        return NextResponse.json({ ok: false, error: `slug not found: ${slugParam}` }, { status: 404 });
      }
    } else {
      target = articles
        .filter((a) => nextMissing(a) !== null)
        .sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        )[0];
      if (!target) {
        return NextResponse.json({
          ok: true,
          message: "all articles fully translated",
          count: articles.length,
        });
      }
    }

    // Pick language
    let code: TargetCode | null = null;
    if (langParam && TARGET_LANGS[langParam]) {
      code = langParam;
    } else {
      code = nextMissing(target);
      if (code === null) {
        return NextResponse.json({
          ok: true,
          message: `article ${target.slug} already fully translated`,
        });
      }
    }

    const translation = await translateOneLang(target, code);

    if (dryRun) {
      return NextResponse.json({
        ok: true,
        dryRun: true,
        slug: target.slug,
        lang: code,
        sampleTitle: translation.title,
      });
    }

    // Re-load + merge + write
    const freshCms = await loadCms();
    const freshArticles = Array.isArray(freshCms.articles)
      ? freshCms.articles
      : [];
    const idx = freshArticles.findIndex((a) => a.slug === target!.slug);
    if (idx === -1) {
      return NextResponse.json(
        { ok: false, error: "article disappeared during translation" },
        { status: 500 }
      );
    }
    const existing =
      (freshArticles[idx].translations as Record<string, unknown>) || {};
    // Also keep FR canonical mirrored at first save
    const fr =
      (existing.fr as unknown) || {
        title: freshArticles[idx].title,
        excerpt: freshArticles[idx].excerpt,
        metaDescription:
          freshArticles[idx].metaDescription || freshArticles[idx].excerpt,
        tags: freshArticles[idx].tags || [],
        content: freshArticles[idx].content,
      };
    const merged = { ...existing, fr, [code]: translation };
    freshArticles[idx] = {
      ...freshArticles[idx],
      translations: merged,
    };
    freshCms.articles = freshArticles;

    await commitCms(
      freshCms,
      `i18n(${code}): traduction « ${target.title.slice(0, 50)} »`
    );

    return NextResponse.json({
      ok: true,
      slug: target.slug,
      lang: code,
      title: translation.title,
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
