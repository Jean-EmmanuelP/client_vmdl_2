import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  Article,
  formatDate,
  getAllArticles,
  getArticleBySlug,
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author || "Vincent Machado Da Luz",
    },
    publisher: {
      "@type": "LegalService",
      name: "VMDL - Law firm & Cover group",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vmdl.ai/images/vmdl-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.vmdl.ai/articles/${article.slug}`,
    },
    keywords: article.tags?.join(", "),
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
