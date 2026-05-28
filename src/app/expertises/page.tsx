import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ArticlesHeader from "../articles/ArticlesHeader";
import SiteFooter from "../articles/SiteFooter";
import { LangProvider } from "../articles/LangContext";
import ContactCTA from "../Components/ContactCTA";

const URL = "https://www.vmdl.ai/expertises";

export const metadata: Metadata = {
  title: "Expertises — Contentieux pénal & Football | VMDL",
  description:
    "Les deux expertises du cabinet VMDL à Paris : contentieux pénal (garde à vue, mise en examen, presse, e-réputation) et droit du football (contrats, transferts FIFA, contentieux disciplinaire).",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: "Expertises — Contentieux pénal & Football | VMDL",
    description:
      "Les deux expertises du cabinet VMDL : contentieux pénal et droit du football.",
    images: [{ url: "https://www.vmdl.ai/images/vmdl-logo.png" }],
  },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Expertises VMDL",
  url: URL,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "LegalService",
        name: "Contentieux pénal",
        url: "https://www.vmdl.ai/expertises/contentieux-penal",
        description:
          "Avocat pénaliste à Paris : garde à vue, mise en examen, pénal des affaires, presse et e-réputation.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "LegalService",
        name: "Football — Droit du sport",
        url: "https://www.vmdl.ai/expertises/football",
        description:
          "Avocat des footballeurs professionnels : contrats, transferts FIFA, mécanisme de solidarité, contentieux disciplinaire.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "VMDL", item: "https://www.vmdl.ai" },
    { "@type": "ListItem", position: 2, name: "Expertises", item: URL },
  ],
};

const EXPERTISES = [
  {
    href: "/expertises/contentieux-penal",
    eyebrow: "01",
    title: "Contentieux pénal",
    body: "Garde à vue, mise en examen, pénal des affaires (ABS, blanchiment), presse et e-réputation (cyberharcèlement, deepfakes, diffamation), exécution des peines. Défense des sportifs, dirigeants et personnalités publiques.",
    cta: "Voir l'expertise pénale",
  },
  {
    href: "/expertises/football",
    eyebrow: "02",
    title: "Football — Droit du sport",
    body: "Contrats des footballeurs professionnels, transferts internationaux et règlement FIFA (RSTP), mécanisme de solidarité, FFAR (règlement des agents), contentieux disciplinaire (DRC, CRL, TAS).",
    cta: "Voir l'expertise football",
  },
];

export default function ExpertisesIndex() {
  return (
    <LangProvider>
      <Script id="ld-expertises-itemlist" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(itemListLd)}
      </Script>
      <Script id="ld-expertises-breadcrumb" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbLd)}
      </Script>

      <main className="min-h-screen bg-blanc text-noir font-riviera">
        <ArticlesHeader />

        <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <header className="border-b border-noir/15 pb-10 sm:pb-14">
            <p className="uppercase text-[11px] sm:text-xs tracking-[0.3em] text-noir/50 mb-3">
              Cabinet VMDL
            </p>
            <h1 className="uppercase text-[28px] sm:text-[44px] leading-[1.05] font-light">
              Expertises
            </h1>
            <p className="mt-5 max-w-2xl text-[14px] sm:text-[17px] leading-[1.7] font-light text-noir/70">
              Le cabinet VMDL exerce dans deux domaines : le contentieux pénal
              et le droit du sport — football. Maître Vincent Machado Da Luz,
              avocat à la Cour et ancien footballeur de haut niveau, accompagne
              ses clients sur l'intégralité de ces deux pratiques.
            </p>
          </header>
        </section>

        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 sm:pb-24">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {EXPERTISES.map((e) => (
              <li key={e.href} className="border border-noir/15 p-6 sm:p-8 flex flex-col">
                <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-noir/40 mb-3">
                  {e.eyebrow} · Expertise
                </p>
                <h2 className="uppercase text-[20px] sm:text-[26px] leading-[1.15] font-light mb-4">
                  {e.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] leading-[1.7] font-light text-noir/70 flex-1">
                  {e.body}
                </p>
                <Link
                  href={e.href}
                  className="mt-6 self-start inline-flex items-center gap-2 bg-noir text-blanc px-5 py-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] hover:opacity-85 transition"
                >
                  {e.cta} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28">
          <ContactCTA />
        </div>

        <SiteFooter />
      </main>
    </LangProvider>
  );
}
