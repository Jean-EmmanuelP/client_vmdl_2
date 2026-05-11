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

// Competitor cabinets. Linkup CAN still study them for intel (we keep them
// in the guidance prompt), but we NEVER show them as sources on a published
// article — that would be a free backlink to a competitor.
const COMPETITOR_DOMAINS = [
  "bertrand-sport-avocat.com",
  "fellous-avocats.com",
  "jurisportiva.fr",
  "degaullefleurance.com",
  "lmtavocats.com",
  "strategos-avocat.com",
  "verzeni-avocat.fr",
  "barthelemy-avocats.com",
  "avocat-plagnol.com",
  "northridgelaw.com",
  "morgansl.com",
];

function isCompetitorUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    return COMPETITOR_DOMAINS.some(
      (d) => host === d || host.endsWith("." + d)
    );
  } catch {
    return false;
  }
}

// Linkup `<guidance>` block: SOFT priority on trusted French legal sources +
// competitor monitoring. Unlike `includeDomains` (hard filter), this biases
// the ranking without locking the index.
const FRENCH_LEGAL_GUIDANCE = `<guidance>
Pour cette recherche : (a) base les faits et citations sur les sources françaises officielles, (b) étudie ce que les cabinets concurrents ont publié pour identifier les ANGLES MORTS et écrire un article plus précis ou plus pratique qu'eux. Si plusieurs sources couvrent la même actualité, favorise celles listées ci-dessous. N'écarte pas une autre source si elle apporte un fait unique et vérifiable.

Sources officielles et de référence (faits et citations) :
- legifrance.gouv.fr
- courdecassation.fr
- conseil-etat.fr
- curia.europa.eu
- conseil-constitutionnel.fr
- fifa.com
- uefa.com
- fff.fr
- lfp.fr
- dalloz-actualite.fr
- actu-juridique.fr
- lextenso.fr
- village-justice.com
- jurisportiva.fr
- cdes.fr
- lemonde.fr
- lefigaro.fr
- lequipe.fr
- lawinsport.com

Cabinets concurrents à étudier pour identifier les angles morts (NE PAS copier, surpasser) :
- bertrand-sport-avocat.com
- fellous-avocats.com
- jurisportiva.fr
- degaullefleurance.com
- lmtavocats.com
- strategos-avocat.com
- verzeni-avocat.fr
- barthelemy-avocats.com
- avocat-plagnol.com
- northridgelaw.com
- morgansl.com

<priority>
- legifrance.gouv.fr
- courdecassation.fr
- conseil-etat.fr
- curia.europa.eu
- conseil-constitutionnel.fr
</priority>
</guidance>`;

interface PublishedArticleHint {
  slug: string;
  title: string;
  tags?: string[];
}

function buildQuery(topic: Topic, alreadyPublished: PublishedArticleHint[] = []): string {
  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const existingBlock =
    alreadyPublished.length > 0
      ? `

ARTICLES DÉJÀ PUBLIÉS SUR VMDL.AI (à NE PAS reprendre, mais à mentionner en lien interne si pertinent) :
${alreadyPublished
  .slice(0, 15)
  .map(
    (a) =>
      `- [${a.title}](https://www.vmdl.ai/articles/${a.slug})${a.tags && a.tags.length ? " — tags: " + a.tags.join(", ") : ""}`
  )
  .join("\n")}

→ Si ton sujet du jour recoupe un de ces articles, CHANGE d'angle, prends une décision plus récente, ou approfondis un aspect non encore couvert. Quand un lien interne s'impose naturellement dans ton texte, utilise la syntaxe Markdown [titre](URL relative ou absolue) pour pointer vers l'article existant — c'est précieux pour le SEO.`
      : "";

  return `${FRENCH_LEGAL_GUIDANCE}

Article de blog SEO + AEO (Answer Engine Optimization) long format en FRANÇAIS pour vmdl.ai (cabinet VMDL, Maître Vincent Machado Da Luz, Paris). Date : ${today}.

SUJET DU JOUR : ${topic.label}
CONTEXTE : ${topic.brief}
PUBLIC VISÉ : ${topic.audience}${existingBlock}

ÉTAPE 1 — RECHERCHE FRAÎCHE
Identifie UNE actualité juridique française précise et datée des 4 dernières semaines. Privilégie les décisions (Cass., CE, CJUE, FIFA DRC, TAS, CA), réformes réglementaires, projets de loi, affaires médiatiques avec angle juridique. Évite les marronniers, sujets vagues, articles d'agrégateurs.

ÉTAPE 2 — RÉDACTION OPTIMISÉE POUR HUMAINS + MOTEURS IA
Cible 1500-2000 mots (9000-12000 caractères). Pour chaque section, applique strictement :

(a) **Réponse directe en première phrase**. Chaque H2 commence par une phrase qui répond directement à la question implicite du titre, en moins de 25 mots, formulée comme une affirmation factuelle et citable hors contexte. Les LLM extraient cette phrase comme réponse — elle DOIT pouvoir tenir seule.

(b) **Densité d'information**. Pas de remplissage. Chaque paragraphe = un fait + sa source ou son texte de référence. Cite : numéros d'arrêt complets, articles de code, dates précises (jour/mois/année), parties nommées, juridictions.

(c) **Listes là où c'est naturel**. Conditions, étapes, conséquences, points de vigilance → listes - ou 1. Les LLM extraient mieux les listes.

(d) **Définitions explicites**. La première fois qu'un terme technique apparaît (FFAR, RSTP, JIRS, DNCG, etc.), le définir en une phrase. Aide à la fois le lecteur non spécialiste ET les moteurs IA qui assemblent des contextes.

(e) **Sections FAQ-friendly**. Au moins 2 sous-titres H3 formulés comme une question naturelle ("Que risque concrètement le joueur ?", "Quand peut-on rompre sans juste cause ?"). Les Answer Engines (Perplexity, ChatGPT, Google AI Overviews) extraient ces blocs préférentiellement.

(f) **Citations courtes**. Si la décision est citable littéralement, utilise un bloc > avec la phrase exacte de l'arrêt + l'attribution.

STYLE
- Pédagogique mais rigoureux. Phrases courtes, voix active.
- N'invente JAMAIS un fait, un nom, un numéro d'arrêt. Si une info n'est pas dans tes sources, ne l'écris pas.
- Pas d'autopromotion lourde du cabinet ; une seule mention finale (voir ci-dessous).
- Pas de phrases creuses du type "il est important de noter", "dans le monde d'aujourd'hui", etc.

STRUCTURE OBLIGATOIRE DU CONTENU MARKDOWN
1. Intro de 3-5 phrases sans titre. La PREMIÈRE phrase doit être une affirmation factuelle datée et citable seule (LLMs adorent).
2. ## Section #1 — le fait/la décision (quoi, qui, quand, où précisément)
3. ## Section #2 — l'analyse juridique (textes applicables, raisonnement, jurisprudence)
   - Inclure 1-2 sous-sections ### formulées comme une question
4. ## Section #3 — la portée pratique pour le public visé (étapes, conditions, risques)
5. ## Section #4 (optionnel) — points de vigilance ou comparaison
6. ## Ce qu'il faut retenir — exactement 3 puces concises (réponse, conséquence, action)
7. Dernière phrase exactement : "Le cabinet VMDL accompagne ses clients sur ces problématiques."

FORMAT MARKDOWN : ## H2, ### H3, **gras** pour termes-clés (pas plus de 1-2 par paragraphe), listes - et 1., > pour citations littérales d'arrêts/textes. PAS de H1 (#).

ANGLES D'INSPIRATION (n'en choisis qu'un, selon l'actu trouvée) :
${topic.exampleAngles.map((a) => "- " + a).join("\n")}

Renvoie EXACTEMENT le format structuré attendu : title (50-75 c., contient un mot-clé long-tail français), excerpt (150-220 c., factuel), metaDescription (140-155 c., distincte de l'excerpt, contient l'année), tags (3-5, première lettre majuscule), content (Markdown ≥ 9000 caractères).`;
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

function passesQualityGate(content: string): {
  ok: boolean;
  reason?: string;
} {
  const chars = content.length;
  if (chars < 4500) return { ok: false, reason: `content too short (${chars} chars, need ≥4500)` };
  const h2Count = (content.match(/^##\s/gm) || []).length;
  if (h2Count < 3) return { ok: false, reason: `not enough H2 sections (${h2Count}, need ≥3)` };
  return { ok: true };
}

async function generateArticleViaLinkup(
  topic: Topic,
  depth: "standard" | "deep" = "standard",
  alreadyPublished: PublishedArticleHint[] = []
): Promise<DraftArticle> {
  const apiKey = process.env.LINKUP_API_KEY;
  if (!apiKey) {
    throw new Error("LINKUP_API_KEY is not configured");
  }

  const client = new LinkupClient({ apiKey });

  const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const toDate = new Date();

  const baseQuery = buildQuery(topic, alreadyPublished);

  // First attempt
  let response = await client.search({
    query: baseQuery,
    depth,
    outputType: "structured",
    structuredOutputSchema: ARTICLE_SCHEMA,
    includeSources: true,
    excludeDomains: EXCLUDE_DOMAINS,
    fromDate,
    toDate,
  });

  let data = response.data as {
    title?: string;
    excerpt?: string;
    metaDescription?: string;
    tags?: string[];
    content?: string;
  };

  // Quality gate + single retry with stronger length insistence
  if (data && data.content) {
    const gate = passesQualityGate(data.content);
    if (!gate.ok) {
      console.warn("[cron] quality gate failed, retrying:", gate.reason);
      response = await client.search({
        query:
          baseQuery +
          `\n\nNOTE IMPORTANTE : ta réponse précédente était trop courte ou mal structurée. Cette fois, produis IMPÉRATIVEMENT un content d'au moins 6000 caractères avec au moins 4 sections H2 distinctes. Développe chaque section, ne réduis pas le contenu.`,
        depth,
        outputType: "structured",
        structuredOutputSchema: ARTICLE_SCHEMA,
        includeSources: true,
        excludeDomains: EXCLUDE_DOMAINS,
        fromDate,
        toDate,
      });
      data = response.data as typeof data;
    }
  }

  if (!data || !data.title || !data.content) {
    throw new Error(
      `Linkup returned invalid structured output: ${JSON.stringify(response).slice(0, 400)}`
    );
  }

  // Filter out competitor cabinets from displayed sources — we don't give
  // free SEO backlinks to competitors. They remain useful for the AI's
  // research stage (Linkup found them), but they never appear on our pages.
  const sources = Array.isArray(response.sources)
    ? response.sources
        .filter((s) => s && s.url && !isCompetitorUrl(s.url))
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

async function fetchPublishedHints(): Promise<PublishedArticleHint[]> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;

  const resp = await octokit.repos.getContent({
    owner,
    repo: cmsRepo,
    path: cmsPath,
  });
  if (Array.isArray(resp.data) || resp.data.type !== "file") return [];
  const cms = JSON.parse(
    Buffer.from(resp.data.content, "base64").toString()
  ) as ContentJson;

  const published: PublishedArticleHint[] = Array.isArray(cms.articles)
    ? (cms.articles as Array<{ slug?: string; title?: string; tags?: string[] }>)
        .filter((a) => a.slug && a.title)
        .map((a) => ({
          slug: a.slug as string,
          title: a.title as string,
          tags: a.tags,
        }))
    : [];
  const drafts: PublishedArticleHint[] = Array.isArray(cms.articles_drafts)
    ? (cms.articles_drafts as Array<{
        slug?: string;
        title?: string;
        tags?: string[];
      }>)
        .filter((a) => a.slug && a.title)
        .map((a) => ({
          slug: a.slug as string,
          title: a.title as string,
          tags: a.tags,
        }))
    : [];
  // Pending drafts also count: we don't want 2 drafts on the same topic in
  // the queue waiting for review.
  return [...published, ...drafts];
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
    // Fetch already-published articles + pending drafts so the AI doesn't
    // duplicate angles and can suggest internal cross-links.
    const alreadyPublished = await fetchPublishedHints().catch(() => []);
    const article = await generateArticleViaLinkup(
      topic,
      depth,
      alreadyPublished
    );
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
