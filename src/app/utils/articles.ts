import contentData from "../cms/content.json";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
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
