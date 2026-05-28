"use client";

import Link from "next/link";
import {
  Article,
  ArticleLocaleCode,
  isCompetitorUrl,
  pickTranslation,
  readingTime,
} from "../../utils/articles";
import ArticleBody from "./ArticleBody";
import Reveal from "../Reveal";
import ContactCTA from "../../Components/ContactCTA";
import { useLang } from "../LangContext";
import { getLabels, langCodeMap, localeDateMap } from "../i18n";

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

export default function ArticleDetailClient({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const { lang } = useLang();
  const t = getLabels(lang);
  const localeCode = langCodeMap[lang] as ArticleLocaleCode;
  const { data, isFallback } = pickTranslation(article, localeCode);
  const minutes = readingTime(data.content);

  return (
    <>
      <article className="max-w-3xl mx-auto px-6 sm:px-10 pt-24 sm:pt-32 pb-20">
        <nav className="mb-8 sm:mb-10">
          <Link
            href="/articles"
            className="uppercase text-[11px] tracking-[0.3em] text-noir/50 hover:text-noir transition"
          >
            {t.backToAll}
          </Link>
        </nav>

        {isFallback && (
          <div className="mb-6 px-4 py-3 border border-noir/15 bg-noir/[0.03] text-[12px] sm:text-[13px] text-noir/70 leading-relaxed">
            {t.notTranslatedNotice}
          </div>
        )}

        <Reveal as="header" className="border-b border-noir/15 pb-8 mb-10">
          <div className="flex flex-wrap gap-3 text-[10px] tracking-[0.25em] uppercase text-noir/50 mb-5">
            <span>{formatDateLocale(article.publishedAt, localeDateMap[lang])}</span>
            <span aria-hidden="true">·</span>
            <span>{minutes} {t.minRead}</span>
            {article.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.author}</span>
              </>
            )}
          </div>
          <h1 className="uppercase text-[24px] sm:text-[36px] leading-[1.1] font-light">
            {data.title}
          </h1>
          {data.excerpt && (
            <p className="mt-5 text-[15px] sm:text-[18px] leading-[1.65] font-light text-noir/70 max-w-2xl">
              {data.excerpt}
            </p>
          )}
        </Reveal>

        <ArticleBody content={data.content} />

        {article.sources &&
          article.sources.filter((s) => !isCompetitorUrl(s.url)).length > 0 && (
            <section className="mt-16 pt-10 border-t border-noir/10">
              <h2 className="uppercase text-[12px] tracking-[0.3em] text-noir/50 mb-4">
                {t.sourcesConsulted}
              </h2>
              <ol className="list-decimal pl-5 space-y-1.5 text-[13px] text-noir/70 marker:text-noir/30">
                {article.sources
                  .filter((s) => !isCompetitorUrl(s.url))
                  .map((s, i) => (
                    <li key={i} className="leading-snug">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="underline decoration-noir/20 hover:decoration-noir transition break-all"
                      >
                        {s.name || s.url}
                      </a>
                    </li>
                  ))}
              </ol>
            </section>
          )}

        {data.tags && data.tags.length > 0 && (
          <footer className="mt-16 pt-10 border-t border-noir/10">
            <p className="uppercase text-[11px] tracking-[0.3em] text-noir/50 mb-3">
              {t.keywords}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
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

      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <ContactCTA />
      </div>

      {related.length > 0 && (
        <aside className="max-w-3xl mx-auto px-6 sm:px-10 pb-20">
          <div className="border-t border-noir/15 pt-10">
            <h2 className="uppercase text-[18px] sm:text-[22px] font-light tracking-[0.05em] mb-8">
              {t.relatedArticles}
            </h2>
            <ul className="flex flex-col">
              {related.map((r, i) => {
                const rTranslation = pickTranslation(r, localeCode).data;
                return (
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
                          {formatDateLocale(r.publishedAt, localeDateMap[lang])}
                        </p>
                      </div>
                      <div className="flex-1">
                        <h3 className="uppercase text-[16px] sm:text-[20px] font-light leading-snug group-hover:text-noir transition-colors">
                          {rTranslation.title}
                        </h3>
                        {rTranslation.excerpt && (
                          <p className="mt-1 text-[13px] sm:text-[14px] leading-relaxed font-light text-noir/65 max-w-xl">
                            {rTranslation.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}
