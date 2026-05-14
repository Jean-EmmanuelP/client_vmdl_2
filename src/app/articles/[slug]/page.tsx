import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  Article,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "../../utils/articles";
import ArticlesHeader from "../ArticlesHeader";
import SiteFooter from "../SiteFooter";
import { LangProvider } from "../LangContext";
import ArticleDetailClient from "./ArticleDetailClient";

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

  // hreflang map for all available translations + the FR canonical
  const url = `https://www.vmdl.ai/articles/${article.slug}`;
  const languages: Record<string, string> = { "fr-FR": url };
  if (article.translations) {
    for (const code of Object.keys(article.translations)) {
      const t = article.translations[code as keyof typeof article.translations];
      if (t) {
        const tag =
          { fr: "fr-FR", en: "en-US", it: "it-IT", es: "es-ES", ar: "ar", pt: "pt-PT", de: "de-DE", zh: "zh-CN" }[
            code
          ] || code;
        languages[tag] = url;
      }
    }
  }
  languages["x-default"] = url;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url,
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
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isAccessibleForFree: true,
  };
}

function breadcrumbJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "VMDL", item: "https://www.vmdl.ai" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://www.vmdl.ai/articles" },
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
  const related = getRelatedArticles(article.slug, 3);

  return (
    <LangProvider>
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

        <ArticleDetailClient article={article} related={related} />

        <SiteFooter />
      </main>
    </LangProvider>
  );
}
