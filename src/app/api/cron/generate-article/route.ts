import { NextResponse } from "next/server";
import { LinkupClient } from "linkup-sdk";
import { Octokit } from "@octokit/rest";
import nodemailer from "nodemailer";
import { pickTopicForDate, TOPICS, Topic } from "./topics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface DraftArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  tags: string[];
  publishedAt: string;
  author: string;
  draftCreatedAt: string;
  draftSource: string;
  sources?: { name: string; url: string }[];
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

// Domains we DON'T want as sources (SEO noise / aggregators).
const EXCLUDE_DOMAINS = [
  "pinterest.com",
  "pinterest.fr",
  "tiktok.com",
  "facebook.com",
  "instagram.com",
  "quora.com",
  "reddit.com",
];

// We don't restrict to a fixed allowlist — Linkup's ranking is good enough.
// Just exclude the noisy sources via EXCLUDE_DOMAINS above.

function buildQuery(topic: Topic): string {
  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `Article de blog SEO long format en FRANÇAIS pour vmdl.ai (cabinet VMDL, Maître Vincent Machado Da Luz, Paris). Date : ${today}.

SUJET DU JOUR : ${topic.label}
CONTEXTE : ${topic.brief}
PUBLIC VISÉ : ${topic.audience}

ÉTAPE 1 — RECHERCHE
Identifie UNE actualité juridique française précise et datée des 4 dernières semaines correspondant au sujet. Privilégie les décisions (Cass., CE, CJUE, FIFA DRC, TAS, CA), réformes réglementaires, projets de loi, affaires médiatiques avec angle juridique. Évite les marronniers, sujets vagues, articles d'agrégateurs.

ÉTAPE 2 — RÉDACTION (LONG FORMAT OBLIGATOIRE)
Le champ "content" doit faire IMPÉRATIVEMENT entre 9 000 et 12 000 caractères de Markdown (≈ 1 500 à 2 000 mots). Un article plus court ne sera PAS accepté. Développe chaque section avec :
- Le contexte juridique et factuel précis
- Les références exactes (numéros d'arrêt, articles de code, dates, cabinets, parties)
- Les conséquences pratiques pour le public visé
- Au moins UN exemple concret ou cas d'application
- Les enjeux ou points de vigilance

STYLE
- Pédagogique mais rigoureux, cite les textes (article L. 222-17 C. sport, art. 17 RSTP FIFA, art. 9 C. civ., etc.).
- N'invente JAMAIS un fait ou une citation. Si une info n'est pas dans tes sources, ne l'écris pas.
- Pas d'autopromotion lourde du cabinet ; une seule mention finale (voir ci-dessous).

STRUCTURE OBLIGATOIRE DU CONTENU MARKDOWN
1. Intro de 3-5 phrases (sans titre) qui pose l'actualité et son enjeu
2. Section H2 #1 — le fait/la décision : qu'est-ce qui s'est passé exactement
3. Section H2 #2 — l'analyse juridique : le raisonnement, les textes, la jurisprudence
4. Section H2 #3 — la portée : ce que ça change concrètement pour le public visé
5. Section H2 #4 (optionnel) — comparaison, cas pratiques, points de vigilance
6. Section H2 finale "## Ce qu'il faut retenir" en 3 puces concises
7. Une dernière phrase exactement : "Le cabinet VMDL accompagne ses clients sur ces problématiques."

FORMAT MARKDOWN : ## H2, ### H3, **gras** termes clés, listes - et 1., > pour citations courtes. Pas de H1 (pas de #).

ANGLES D'INSPIRATION (n'en choisis qu'un, selon l'actu) :
${topic.exampleAngles.map((a) => "- " + a).join("\n")}

Renvoie EXACTEMENT le format structuré attendu : title (50-75 c.), excerpt (150-220 c.), metaDescription (140-155 c.), tags (3-5), content (Markdown long format ≥ 9 000 caractères).`;
}

const ARTICLE_SCHEMA = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "Titre de l'article entre 50 et 75 caractères, accrocheur, intégrant 2 mots-clés SEO français.",
    },
    excerpt: {
      type: "string",
      description:
        "Résumé neutre de 150 à 220 caractères affiché sur la page liste.",
    },
    metaDescription: {
      type: "string",
      description:
        "Description SEO Google de 140 à 155 caractères, distincte de l'excerpt.",
    },
    tags: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5,
      description:
        "3 à 5 tags français courts, première lettre en majuscule.",
    },
    content: {
      type: "string",
      minLength: 9000,
      description:
        "Article complet en Markdown long format. Longueur OBLIGATOIRE : au moins 9000 caractères (≈ 1500 mots). Structure ## H2 / ### H3 / **gras** / listes / citations >. Ne pas inclure de titre H1.",
    },
  },
  required: ["title", "excerpt", "metaDescription", "tags", "content"],
};

async function generateArticleViaLinkup(
  topic: Topic,
  depth: "standard" | "deep" = "standard"
): Promise<DraftArticle> {
  const apiKey = process.env.LINKUP_API_KEY;
  if (!apiKey) {
    throw new Error("LINKUP_API_KEY is not configured");
  }

  const client = new LinkupClient({ apiKey });

  const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const toDate = new Date();

  // depth=standard: sub-second, fits in 60s Vercel Hobby limit, still excellent.
  // depth=deep: more exhaustive but can exceed 60s — only safe locally / on Pro.
  const response = await client.search({
    query: buildQuery(topic),
    depth,
    outputType: "structured",
    structuredOutputSchema: ARTICLE_SCHEMA,
    includeSources: true,
    excludeDomains: EXCLUDE_DOMAINS,
    fromDate,
    toDate,
  });

  const data = response.data as {
    title?: string;
    excerpt?: string;
    metaDescription?: string;
    tags?: string[];
    content?: string;
  };

  if (!data || !data.title || !data.content) {
    throw new Error(
      `Linkup returned invalid structured output: ${JSON.stringify(response).slice(0, 400)}`
    );
  }

  const sources = Array.isArray(response.sources)
    ? response.sources
        .filter((s) => s && s.url)
        .slice(0, 8)
        .map((s) => ({ name: s.name || s.url || "", url: s.url || "" }))
    : undefined;

  const title = data.title as string;
  const content = data.content as string;
  const slug = slugify(title);
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug,
    title: title.trim(),
    excerpt: (data.excerpt || "").trim(),
    metaDescription: (data.metaDescription || data.excerpt || "").trim(),
    tags: Array.isArray(data.tags) ? data.tags.slice(0, 5) : [],
    content,
    publishedAt: today,
    author: "Vincent Machado Da Luz",
    draftCreatedAt: new Date().toISOString(),
    draftSource: `linkup-${depth}-${topic.sector}`,
    sources,
  };
}

interface ContentJson {
  articles?: unknown[];
  articles_drafts?: DraftArticle[];
  [k: string]: unknown;
}

async function appendDraftToContent(article: DraftArticle): Promise<void> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;
  const currentRepo = process.env.GITHUB_CURRENT_REPO as string;
  const currentPath = process.env.GITHUB_CONTENT_CURRENT_PATH as string;

  const cmsResp = await octokit.repos.getContent({
    owner,
    repo: cmsRepo,
    path: cmsPath,
  });
  if (Array.isArray(cmsResp.data) || cmsResp.data.type !== "file") {
    throw new Error("CMS content file not found");
  }
  const cmsRaw = Buffer.from(cmsResp.data.content, "base64").toString();
  const cms = JSON.parse(cmsRaw) as ContentJson;
  const drafts = Array.isArray(cms.articles_drafts) ? cms.articles_drafts : [];

  const allSlugs = new Set<string>([
    ...drafts.map((d) => d.slug),
    ...(Array.isArray(cms.articles)
      ? (cms.articles as { slug?: string }[]).map((a) => a.slug || "")
      : []),
  ]);
  let finalSlug = article.slug;
  let n = 2;
  while (allSlugs.has(finalSlug)) {
    finalSlug = `${article.slug}-${n}`;
    n++;
  }
  const finalArticle: DraftArticle = { ...article, slug: finalSlug };

  cms.articles_drafts = [...drafts, finalArticle];

  const newContent = Buffer.from(
    JSON.stringify(cms, null, 2)
  ).toString("base64");

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo: cmsRepo,
    path: cmsPath,
    message: `chore(cron): nouvel article brouillon « ${article.title.slice(0, 60)} »`,
    content: newContent,
    sha: cmsResp.data.sha,
  });

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
      message: `chore(cron): nouvel article brouillon « ${article.title.slice(0, 60)} »`,
      content: newContent,
      sha: curResp.data.sha,
    });
  }
}

async function notifyDraftReady(article: DraftArticle, topic: Topic) {
  const user = process.env.EMAIL_USERNAME;
  const pass = process.env.EMAIL_PASSWORD;
  if (!user || !pass) return;

  const transport = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const reviewUrl = "https://www.vmdl.ai/cms";
  const sourcesHtml =
    article.sources && article.sources.length > 0
      ? `<p style="margin-top:12px;color:#444;font-size:13px;"><strong>Sources Linkup utilisées :</strong></p>
         <ul style="font-size:12px;color:#555;">${article.sources
           .map(
             (s) =>
               `<li><a href="${s.url}" style="color:#0a58ca;">${(s.name || s.url).replace(/</g, "&lt;")}</a></li>`
           )
           .join("")}</ul>`
      : "";

  const html = `
    <p>Bonjour Maître,</p>
    <p>Un nouvel article a été pré-rédigé automatiquement (Linkup Deep Search) et attend votre relecture dans l'espace CMS du site VMDL.</p>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td><strong>Sujet</strong></td><td>${topic.label}</td></tr>
      <tr><td><strong>Titre proposé</strong></td><td>${article.title.replace(/</g, "&lt;")}</td></tr>
      <tr><td><strong>Tags</strong></td><td>${article.tags.join(", ")}</td></tr>
    </table>
    ${sourcesHtml}
    <p style="margin-top:16px;">
      <a href="${reviewUrl}" style="background:#030303;color:#F9F9F9;padding:12px 22px;text-decoration:none;text-transform:uppercase;letter-spacing:.2em;font-size:11px;">Relire et publier</a>
    </p>
    <p style="color:#666;font-size:12px;margin-top:24px;">L'article ne sera publié qu'après votre validation manuelle dans l'onglet « Brouillons IA » du CMS.</p>
  `;
  await transport.sendMail({
    from: user,
    to: "cabinet@vmdl.ai",
    subject: `VMDL — Brouillon prêt : ${article.title}`,
    html,
  });
}

async function handle(req: Request) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!process.env.LINKUP_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Missing LINKUP_API_KEY" },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  const sectorParam = url.searchParams.get("sector");
  const dryRun = url.searchParams.get("dryRun") === "1";
  const depthParam = url.searchParams.get("depth");
  const depth: "standard" | "deep" =
    depthParam === "deep" ? "deep" : "standard";
  const topic = sectorParam
    ? TOPICS.find((t) => t.sector === sectorParam) || pickTopicForDate()
    : pickTopicForDate();

  try {
    const article = await generateArticleViaLinkup(topic, depth);
    if (dryRun) {
      return NextResponse.json({
        ok: true,
        dryRun: true,
        sector: topic.sector,
        article,
      });
    }
    await appendDraftToContent(article);
    await notifyDraftReady(article, topic).catch((e) =>
      console.warn("[cron] notify failed:", (e as Error).message)
    );
    return NextResponse.json({
      ok: true,
      sector: topic.sector,
      slug: article.slug,
      title: article.title,
      sourcesCount: article.sources?.length || 0,
    });
  } catch (err) {
    console.error("[cron generate-article] failed:", err);
    return NextResponse.json(
      {
        ok: false,
        sector: topic.sector,
        error: (err as Error).message,
      },
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
