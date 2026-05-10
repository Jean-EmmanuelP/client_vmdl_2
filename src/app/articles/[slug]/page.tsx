import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  Article,
  formatDate,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  readingTime,
} from "../../utils/articles";
import ArticlesHeader from "../ArticlesHeader";
import ArticleBody from "./ArticleBody";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article introuvable" };
  }
  const description =
    article.metaDescription || article.excerpt || article.title;
  return {
    title: article.title,
    description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: `https://www.vmdl.ai/articles/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

function articleJsonLd(article: Article) {
  const wordCount = article.content
    .replace(/[#>*_\-\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const url = `https://www.vmdl.ai/articles/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    name: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "fr-FR",
    wordCount,
    articleSection: article.tags?.[0] || "Droit",
    keywords: article.tags?.join(", "),
    image: [`https://www.vmdl.ai${url}/opengraph-image`],
    url,
    author: {
      "@type": "Person",
      name: article.author || "Vincent Machado Da Luz",
      jobTitle: "Avocat à la Cour",
      worksFor: {
        "@type": "LegalService",
        name: "VMDL - Law firm & Cover group",
        url: "https://www.vmdl.ai",
      },
      url: "https://www.vmdl.ai",
    },
    publisher: {
      "@type": "LegalService",
      name: "VMDL",
      alternateName: "VMDL - Law firm & Cover group",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vmdl.ai/images/vmdl-logo.png",
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isAccessibleForFree: true,
  };
}

function breadcrumbJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "VMDL",
        item: "https://www.vmdl.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://www.vmdl.ai/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://www.vmdl.ai/articles/${article.slug}`,
      },
    ],
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const minutes = readingTime(article.content);

  return (
    <main className="min-h-screen bg-blanc text-noir font-riviera">
      <ArticlesHeader />

      <Script
        id={`ld-article-${article.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(articleJsonLd(article))}
      </Script>
      <Script
        id={`ld-breadcrumb-${article.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(breadcrumbJsonLd(article))}
      </Script>

      <article className="max-w-3xl mx-auto px-6 sm:px-10 pt-28 sm:pt-40 pb-20">
        <nav className="mb-10 sm:mb-14">
          <Link
            href="/articles"
            className="uppercase text-[11px] tracking-[0.3em] text-noir/50 hover:text-noir transition"
          >
            ← Tous les articles
          </Link>
        </nav>

        <header className="border-b border-noir/15 pb-10 mb-12">
          <div className="flex flex-wrap gap-4 text-[11px] tracking-[0.25em] uppercase text-noir/50 mb-6">
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{minutes} min de lecture</span>
            {article.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.author}</span>
              </>
            )}
          </div>
          <h1 className="uppercase text-[32px] sm:text-[52px] leading-[1.08] font-light">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 text-[16px] sm:text-[20px] leading-[1.7] font-light text-noir/70 max-w-2xl">
              {article.excerpt}
            </p>
          )}
        </header>

        <ArticleBody content={article.content} />

        {article.tags && article.tags.length > 0 && (
          <footer className="mt-16 pt-10 border-t border-noir/10">
            <p className="uppercase text-[11px] tracking-[0.3em] text-noir/50 mb-3">
              Mots-clés
            </p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs uppercase tracking-wider border border-noir/15 text-noir/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>

      {(() => {
        const related = getRelatedArticles(article.slug, 3);
        if (related.length === 0) return null;
        return (
          <aside
            aria-labelledby="related-heading"
            className="max-w-3xl mx-auto px-6 sm:px-10 pb-20"
          >
            <div className="border-t border-noir/15 pt-10">
              <h2
                id="related-heading"
                className="uppercase text-[18px] sm:text-[22px] font-light tracking-[0.05em] mb-8"
              >
                Articles liés
              </h2>
              <ul className="flex flex-col">
                {related.map((r, i) => (
                  <li
                    key={r.slug}
                    className={`group ${i !== 0 ? "border-t border-noir/10" : ""}`}
                  >
                    <Link
                      href={`/articles/${r.slug}`}
                      className="flex flex-col sm:flex-row sm:items-baseline sm:gap-8 py-6 transition-colors duration-300 hover:bg-noir/[0.02] -mx-4 px-4"
                    >
                      <div className="sm:w-32 flex-shrink-0 mb-2 sm:mb-0">
                        <p className="uppercase text-[10px] tracking-[0.25em] text-noir/45">
                          {formatDate(r.publishedAt)}
                        </p>
                      </div>
                      <div className="flex-1">
                        <h3 className="uppercase text-[16px] sm:text-[20px] font-light leading-snug group-hover:text-noir transition-colors">
                          {r.title}
                        </h3>
                        {r.excerpt && (
                          <p className="mt-1 text-[13px] sm:text-[14px] leading-relaxed font-light text-noir/65 max-w-xl">
                            {r.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        );
      })()}

      <footer className="border-t border-noir/10 bg-noir text-blanc">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="uppercase text-[11px] tracking-[0.3em] text-blanc/60">
              VMDL — Cabinet d&apos;avocat
            </p>
            <p className="mt-1 text-[16px] font-light">
              Pour échanger sur cet article ou un dossier
            </p>
          </div>
          <a
            href="mailto:cabinet@vmdl.ai"
            className="uppercase text-[11px] tracking-[0.3em] border border-blanc/30 px-5 py-3 hover:bg-blanc hover:text-noir transition"
          >
            cabinet@vmdl.ai
          </a>
        </div>
      </footer>
    </main>
  );
}
