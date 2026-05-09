import Link from "next/link";
import { getAllArticles, formatDate, readingTime } from "../utils/articles";
import ArticlesHeader from "./ArticlesHeader";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-blanc text-noir font-riviera">
      <ArticlesHeader />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 sm:pt-40 pb-20">
        <header className="mb-16 sm:mb-24 border-b border-noir/15 pb-10">
          <p className="uppercase text-[11px] sm:text-xs tracking-[0.3em] text-noir/50 mb-4">
            Le Cabinet VMDL
          </p>
          <h1 className="uppercase text-[34px] sm:text-[56px] leading-[1.05] font-light">
            Articles & Publications
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] sm:text-[18px] leading-[1.7] font-light text-noir/70">
            Analyses, perspectives et actualités juridiques rédigées par Maître
            Vincent Machado Da Luz et le cabinet VMDL.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="uppercase text-xs tracking-[0.3em] text-noir/40 mb-4">
              À paraître
            </p>
            <p className="text-[18px] sm:text-[22px] font-light text-noir/70 max-w-xl mx-auto">
              Les premières publications du cabinet seront prochainement
              disponibles ici.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {articles.map((article, i) => (
              <li
                key={article.slug}
                className={`group ${
                  i !== 0 ? "border-t border-noir/10" : ""
                }`}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:gap-12 py-8 sm:py-10 transition-colors duration-300 hover:bg-noir/[0.02] -mx-4 sm:-mx-6 px-4 sm:px-6"
                >
                  <div className="sm:w-44 flex-shrink-0 mb-3 sm:mb-0">
                    <p className="uppercase text-[11px] tracking-[0.25em] text-noir/50">
                      {formatDate(article.publishedAt)}
                    </p>
                    <p className="text-[11px] tracking-[0.2em] text-noir/35 mt-1 uppercase">
                      {readingTime(article.content)} min de lecture
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="uppercase text-[22px] sm:text-[30px] font-light leading-[1.15] group-hover:text-noir transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="mt-3 text-[14px] sm:text-[16px] leading-[1.65] font-light text-noir/65 max-w-2xl">
                        {article.excerpt}
                      </p>
                    )}
                    <span className="inline-block mt-4 uppercase text-[11px] tracking-[0.3em] text-noir/40 group-hover:text-noir transition-colors">
                      Lire l&apos;article →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="border-t border-noir/10 bg-noir text-blanc">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="uppercase text-[11px] tracking-[0.3em] hover:opacity-70 transition"
          >
            ← VMDL — Cabinet d&apos;avocat
          </Link>
          <a
            href="mailto:cabinet@vmdl.ai"
            className="uppercase text-[11px] tracking-[0.3em] text-blanc/70 hover:text-blanc transition"
          >
            cabinet@vmdl.ai
          </a>
        </div>
      </footer>
    </main>
  );
}
