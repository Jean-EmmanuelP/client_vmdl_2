"use client";

import Link from "next/link";
import {
  Article,
  ArticleLocaleCode,
  pickTranslation,
  readingTime,
} from "../utils/articles";
import RevealList from "./RevealList";
import { useLang } from "./LangContext";
import { getLabels, langCodeMap, localeDateMap } from "./i18n";

function formatDateLocale(iso: string, locale: string): string {
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

export default function ArticlesListClient({
  articles,
}: {
  articles: Article[];
}) {
  const { lang } = useLang();
  const t = getLabels(lang);
  const localeCode = langCodeMap[lang] as ArticleLocaleCode;

  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-20">
      <header className="mb-12 sm:mb-16 border-b border-noir/15 pb-8">
        <p className="uppercase text-[11px] sm:text-xs tracking-[0.3em] text-noir/50 mb-3">
          {t.cabinetTitle}
        </p>
        <h1 className="uppercase text-[28px] sm:text-[42px] leading-[1.1] font-light">
          {t.articlesPublications}
        </h1>
        <p className="mt-5 max-w-2xl text-[14px] sm:text-[16px] leading-[1.7] font-light text-noir/70">
          {t.introList}
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="py-24 text-center">
          <p className="uppercase text-xs tracking-[0.3em] text-noir/40 mb-4">
            {t.emptyTitle}
          </p>
          <p className="text-[18px] sm:text-[22px] font-light text-noir/70 max-w-xl mx-auto">
            {t.emptyBody}
          </p>
        </div>
      ) : (
        <RevealList>
          {articles.map((article) => {
            const { data } = pickTranslation(article, localeCode);
            return (
              <li key={article.slug} className="group">
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:gap-10 py-7 sm:py-9 transition-colors duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] hover:bg-noir/[0.02] -mx-4 sm:-mx-6 px-4 sm:px-6"
                >
                  <div className="sm:w-40 flex-shrink-0 mb-3 sm:mb-0">
                    <p className="uppercase text-[11px] tracking-[0.25em] text-noir/50">
                      {formatDateLocale(article.publishedAt, localeDateMap[lang])}
                    </p>
                    <p className="text-[11px] tracking-[0.2em] text-noir/35 mt-1 uppercase">
                      {readingTime(data.content)} {t.minRead}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="uppercase text-[18px] sm:text-[24px] font-light leading-[1.2] group-hover:text-noir transition-colors">
                      {data.title}
                    </h2>
                    {data.excerpt && (
                      <p className="mt-3 text-[13px] sm:text-[15px] leading-[1.6] font-light text-noir/65 max-w-2xl">
                        {data.excerpt}
                      </p>
                    )}
                    <span className="inline-block mt-4 uppercase text-[10px] tracking-[0.3em] text-noir/40 group-hover:text-noir transition-colors">
                      {t.readArticle} →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </RevealList>
      )}
    </section>
  );
}
