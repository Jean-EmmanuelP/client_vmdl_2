import Link from "next/link";
import ArticlesHeader from "../ArticlesHeader";
import SiteFooter from "../SiteFooter";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-blanc text-noir font-riviera">
      <ArticlesHeader />
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pt-32 sm:pt-44 pb-20 text-center">
        <p className="text-[11px] tracking-[0.3em] text-noir/50 mb-4">
          Erreur 404
        </p>
        <h1 className="text-[24px] sm:text-[36px] leading-[1.1] font-light">
          Article introuvable
        </h1>
        <p className="mt-5 text-noir/70 font-light">
          Cet article n&apos;existe pas ou a été retiré.
        </p>
        <Link
          href="/articles"
          className="inline-block mt-10 text-[11px] tracking-[0.3em] border border-noir/30 px-6 py-3 hover:bg-noir hover:text-blanc transition"
        >
          Voir tous les articles
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
