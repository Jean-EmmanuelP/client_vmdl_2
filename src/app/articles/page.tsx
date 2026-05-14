import Link from "next/link";
import { getAllArticles, formatDate, readingTime } from "../utils/articles";
import ArticlesHeader from "./ArticlesHeader";
import SiteFooter from "./SiteFooter";
import RevealList from "./RevealList";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-blanc text-noir font-riviera">
      <ArticlesHeader />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-20">
        <header className="mb-12 sm:mb-16 border-b border-noir/15 pb-8">
          <p className="uppercase text-[11px] sm:text-xs tracking-[0.3em] text-noir/50 mb-3">
            Le Cabinet VMDL
          </p>
          <h1 className="uppercase text-[28px] sm:text-[42px] leading-[1.1] font-light">
            Articles &amp; Publications
          </h1>
          <p className="mt-5 max-w-2xl text-[14px] sm:text-[16px] leading-[1.7] font-light text-noir/70">
            Analyses, perspectives et actualités juridiques rédigées par
            Maître Vincent Machado da Luz et le cabinet VMDL.
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
          <RevealList>
            {articles.map((article) => (
              <li key={article.slug} className="group">
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:gap-10 py-7 sm:py-9 transition-colors duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] hover:bg-noir/[0.02] -mx-4 sm:-mx-6 px-4 sm:px-6"
                >
                  <div className="sm:w-40 flex-shrink-0 mb-3 sm:mb-0">
                    <p className="uppercase text-[11px] tracking-[0.25em] text-noir/50">
                      {formatDate(article.publishedAt)}
                    </p>
                    <p className="text-[11px] tracking-[0.2em] text-noir/35 mt-1 uppercase">
                      {readingTime(article.content)} min de lecture
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="uppercase text-[18px] sm:text-[24px] font-light leading-[1.2] group-hover:text-noir transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="mt-3 text-[13px] sm:text-[15px] leading-[1.6] font-light text-noir/65 max-w-2xl">
                        {article.excerpt}
                      </p>
                    )}
                    <span className="inline-block mt-4 uppercase text-[10px] tracking-[0.3em] text-noir/40 group-hover:text-noir transition-colors">
                      Lire l&apos;article →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </RevealList>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
