import contentData from "../cms/content.json";

export interface ArticleSource {
  name: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
  sources?: ArticleSource[];
}

interface ContentJson {
  articles?: Article[];
  [key: string]: unknown;
}

export function getAllArticles(): Article[] {
  const data = contentData as ContentJson;
  const articles = data.articles ?? [];
  return [...articles].sort((a, b) => {
    const da = new Date(a.publishedAt).getTime();
    const db = new Date(b.publishedAt).getTime();
    return db - da;
  });
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}

export function formatDate(iso: string, locale = "fr-FR"): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Competitor cabinets — kept in sync with the cron route. Used to filter
// sources displayed on the public article page, defence-in-depth in case
// a draft slips through with a competitor URL.
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

export function isCompetitorUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    return COMPETITOR_DOMAINS.some(
      (d) => host === d || host.endsWith("." + d)
    );
  } catch {
    return false;
  }
}

export function getRelatedArticles(
  currentSlug: string,
  limit = 3
): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== currentSlug);
  if (all.length === 0) return [];

  const current = getArticleBySlug(currentSlug);
  if (!current) return all.slice(0, limit);

  const currentTags = new Set(
    (current.tags || []).map((t) => t.toLowerCase())
  );

  // Score each candidate by shared tag count, then by recency.
  const scored = all.map((a) => {
    const shared = (a.tags || []).filter((t) =>
      currentTags.has(t.toLowerCase())
    ).length;
    return { article: a, score: shared };
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.article.publishedAt).getTime() -
      new Date(a.article.publishedAt).getTime()
    );
  });

  return scored.slice(0, limit).map((s) => s.article);
}
