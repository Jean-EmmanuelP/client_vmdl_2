import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ArticlesHeader from "../../articles/ArticlesHeader";
import SiteFooter from "../../articles/SiteFooter";
import { LangProvider } from "../../articles/LangContext";
import ContactCTA from "../../Components/ContactCTA";

const URL = "https://www.vmdl.ai/expertises/contentieux-penal";

export const metadata: Metadata = {
  title: "Avocat pénal sportif Paris — Contentieux pénal | VMDL",
  description:
    "Avocat pénaliste à Paris pour sportifs, dirigeants et personnalités publiques. Garde à vue, mise en examen, droit pénal des affaires, presse et e-réputation. Maître Vincent Machado Da Luz.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: "Avocat pénal sportif Paris — VMDL",
    description:
      "Défense pénale des sportifs, dirigeants et personnalités publiques par le cabinet VMDL — garde à vue, mise en examen, pénal des affaires, presse, e-réputation.",
    images: [{ url: "https://www.vmdl.ai/images/vmdl-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avocat pénal sportif Paris — VMDL",
    description:
      "Défense pénale des sportifs, dirigeants et personnalités publiques. Garde à vue, mise en examen, pénal des affaires, presse, e-réputation.",
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": URL,
  name: "VMDL — Contentieux pénal",
  alternateName: "Avocat pénal sportif Paris",
  description:
    "Cabinet VMDL — défense pénale des sportifs, personnalités publiques et dirigeants : garde à vue, mise en examen, pénal des affaires, presse, e-réputation.",
  serviceType: "Criminal Defense Law",
  url: URL,
  areaServed: ["FR"],
  provider: {
    "@type": "LegalService",
    name: "VMDL",
    url: "https://www.vmdl.ai",
    telephone: "+33 7 57 41 72 87",
    email: "cabinet@vmdl.ai",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Rue de Poissy",
      addressLocality: "Paris",
      postalCode: "75005",
      addressCountry: "FR",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Domaines du contentieux pénal",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garde à vue et premières heures de procédure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mise en examen et instruction" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Droit pénal des affaires (ABS, blanchiment, corruption)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Droit pénal de la presse, diffamation, cyberharcèlement et deepfakes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Risques pénaux des sportifs et personnalités publiques" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exécution des peines et aménagements" } },
    ],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "VMDL", item: "https://www.vmdl.ai" },
    { "@type": "ListItem", position: 2, name: "Expertises", item: "https://www.vmdl.ai/?section=expertise" },
    { "@type": "ListItem", position: 3, name: "Contentieux pénal", item: URL },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Que faire en cas de convocation pour une garde à vue ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Vous avez le droit à l'assistance d'un avocat dès la première heure. Le cabinet VMDL intervient en urgence pour vous assister durant les auditions, vérifier la régularité de la procédure et préserver vos droits dès les premières minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle différence entre mise en examen et témoin assisté ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Le statut de mis en examen suppose des indices graves ou concordants ; celui de témoin assisté repose sur de simples indices. Le mis en examen peut faire l'objet d'un contrôle judiciaire ou d'une détention provisoire ; le témoin assisté non. Le cabinet conseille sur le statut adapté et plaide les requêtes en annulation lorsque les conditions ne sont pas remplies.",
      },
    },
    {
      "@type": "Question",
      name: "Le cabinet défend-il les sportifs en matière pénale ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Oui. Maître Vincent Machado Da Luz est ancien footballeur de haut niveau et défend les sportifs professionnels, dirigeants et agents face aux risques pénaux spécifiques aux personnalités publiques : violences sur le terrain, presse et e-réputation, fiscalité, atteintes à la vie privée.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les honoraires en matière pénale ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Les modalités d'intervention et de rémunération sont définies dès le premier rendez-vous, par convention d'honoraires : taux horaire, forfait ou honoraire de résultat selon la complexité du dossier. Voir la rubrique Honoraires sur la page d'accueil.",
      },
    },
  ],
};

const PRACTICE_AREAS = [
  {
    n: "01",
    title: "Garde à vue & premières heures",
    body:
      "Intervention immédiate dès la première heure. Assistance lors des auditions, contrôle de la régularité de la procédure, préservation des droits de la défense, accompagnement des proches et de l'entourage médiatique.",
  },
  {
    n: "02",
    title: "Mise en examen & instruction",
    body:
      "Stratégie de défense en phase d'instruction : choix du statut (mis en examen / témoin assisté), requêtes en annulation, demandes d'actes, contestation des mesures de sûreté (contrôle judiciaire, détention provisoire).",
  },
  {
    n: "03",
    title: "Droit pénal des affaires",
    body:
      "Défense des dirigeants en abus de biens sociaux, blanchiment, corruption, escroquerie, manquements réglementaires. Préparation des auditions, négociation de CJIP, gestion de la dimension réputationnelle en parallèle.",
  },
  {
    n: "04",
    title: "Presse, e-réputation & cyberharcèlement",
    body:
      "Droit pénal de la presse (loi 1881) : diffamation, injure, atteinte à la vie privée (art. 9 C. civ.). Référés d'heure à heure, retrait de contenus, action contre les deepfakes et le cyberharcèlement des personnalités publiques.",
  },
  {
    n: "05",
    title: "Sportifs & personnalités publiques",
    body:
      "Risques pénaux spécifiques au sport professionnel : violences sur le terrain, dopage, atteinte à l'image, contentieux médiatiques. Approche pensée pour des clients en exposition publique, gestion fine du calendrier sportif.",
  },
  {
    n: "06",
    title: "Exécution des peines & aménagements",
    body:
      "Demandes d'aménagement de peine (semi-liberté, placement extérieur, surveillance électronique), libération conditionnelle, relèvement, effacement du casier judiciaire — pour préserver l'avenir professionnel du client.",
  },
];

const FAQ = [
  {
    q: "Que faire en cas de convocation pour une garde à vue ?",
    a:
      "Vous avez le droit à l'assistance d'un avocat dès la première heure. Le cabinet VMDL intervient en urgence pour vous assister durant les auditions, vérifier la régularité de la procédure et préserver vos droits dès les premières minutes.",
  },
  {
    q: "Quelle différence entre mise en examen et témoin assisté ?",
    a:
      "Le statut de mis en examen suppose des indices graves ou concordants ; celui de témoin assisté repose sur de simples indices. Le mis en examen peut faire l'objet d'un contrôle judiciaire ou d'une détention provisoire ; le témoin assisté non. Le cabinet conseille sur le statut adapté et plaide les requêtes en annulation lorsque les conditions ne sont pas remplies.",
  },
  {
    q: "Le cabinet défend-il les sportifs en matière pénale ?",
    a:
      "Oui. Maître Vincent Machado Da Luz est ancien footballeur de haut niveau et défend les sportifs professionnels, dirigeants et agents face aux risques pénaux spécifiques aux personnalités publiques : violences sur le terrain, presse et e-réputation, fiscalité, atteintes à la vie privée.",
  },
  {
    q: "Quels sont les honoraires en matière pénale ?",
    a:
      "Les modalités d'intervention et de rémunération sont définies dès le premier rendez-vous, par convention d'honoraires : taux horaire, forfait ou honoraire de résultat selon la complexité du dossier. Voir la rubrique Honoraires sur la page d'accueil.",
  },
];

export default function ContentieuxPenalPage() {
  return (
    <LangProvider>
      <Script
        id="ld-service-contentieux-penal"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(serviceLd)}
      </Script>
      <Script
        id="ld-breadcrumb-contentieux-penal"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(breadcrumbLd)}
      </Script>
      <Script
        id="ld-faq-contentieux-penal"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>

      <main className="min-h-screen bg-blanc text-noir font-riviera">
        <ArticlesHeader />

        <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <header className="border-b border-noir/15 pb-10 sm:pb-14">
            <p className="uppercase text-[11px] sm:text-xs tracking-[0.3em] text-noir/50 mb-3">
              VMDL · Expertise
            </p>
            <h1 className="uppercase text-[28px] sm:text-[44px] leading-[1.05] font-light">
              Contentieux pénal
            </h1>
            <p className="mt-5 max-w-2xl text-[14px] sm:text-[17px] leading-[1.7] font-light text-noir/70">
              Défense pénale des sportifs, dirigeants et personnalités publiques.
              Garde à vue, mise en examen, pénal des affaires, presse et
              e-réputation. Intervention en urgence à Paris et dans toute la
              France.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/33757417287?text=${encodeURIComponent(
                  "Bonjour Maître, je souhaite être rappelé dans les meilleurs délais.\n\nContexte : [garde à vue / convocation / mise en examen / autre]\nNom : "
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                data-clickable="true"
                className="inline-flex items-center gap-2 bg-noir text-blanc px-5 py-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] hover:opacity-80 transition"
              >
                Demander un rappel WhatsApp
              </a>
              <a
                href="tel:+33757417287"
                data-clickable="true"
                className="inline-flex items-center gap-2 border border-noir/30 text-noir px-5 py-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] hover:bg-noir hover:text-blanc transition"
              >
                07 57 41 72 87
              </a>
            </div>
          </header>
        </section>

        <section
          id="domaines"
          aria-labelledby="domaines-heading"
          className="max-w-5xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20 scroll-mt-28"
        >
          <header className="mb-8 sm:mb-10">
            <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-noir/40 mb-2">
              Domaines couverts
            </p>
            <h2
              id="domaines-heading"
              className="uppercase text-[22px] sm:text-[30px] leading-[1.15] font-light border-t border-noir/15 pt-6"
            >
              Six axes de défense pénale
            </h2>
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {PRACTICE_AREAS.map((p) => (
              <li key={p.n} className="border-t border-noir/10 pt-5">
                <p className="text-[11px] tracking-[0.25em] text-noir/40 mb-2">
                  {p.n}
                </p>
                <h3 className="uppercase text-[15px] sm:text-[17px] leading-[1.25] font-medium mb-3">
                  {p.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-[1.7] font-light text-noir/70">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28 scroll-mt-28"
        >
          <header className="mb-8 sm:mb-10">
            <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-noir/40 mb-2">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="uppercase text-[22px] sm:text-[30px] leading-[1.15] font-light border-t border-noir/15 pt-6"
            >
              Questions fréquentes
            </h2>
          </header>
          <dl className="divide-y divide-noir/10">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="text-[14px] sm:text-[16px] font-medium mb-2">
                  {item.q}
                </dt>
                <dd className="text-[13px] sm:text-[14px] leading-[1.7] font-light text-noir/70 max-w-3xl">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Section « Pour aller plus loin / Articles & analyses » temporairement retirée du public.
        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16">
          <div className="border-t border-noir/15 pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
            <div>
              <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-noir/40 mb-2">
                Pour aller plus loin
              </p>
              <h2 className="uppercase text-[20px] sm:text-[26px] leading-[1.15] font-light">
                Articles & analyses
              </h2>
              <p className="mt-3 max-w-xl text-[13px] sm:text-[14px] leading-[1.7] font-light text-noir/65">
                Retrouvez les analyses du cabinet sur la garde à vue, la
                détention provisoire, le cyberharcèlement et le droit pénal des
                affaires.
              </p>
            </div>
            <Link
              href="/articles#penal"
              className="self-start inline-flex items-center gap-2 border border-noir/30 text-noir px-5 py-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] hover:bg-noir hover:text-blanc transition"
            >
              Lire les articles pénal →
            </Link>
          </div>
        </section>
        */}

        <div className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28">
          <ContactCTA
            variant="default"
            eyebrow="Cabinet VMDL — joindre l'avocat pénaliste"
            title="Convocation, garde à vue ou mise en examen ?"
            body="Maître Vincent Machado Da Luz intervient dès la première heure de garde à vue et reçoit en direct toute demande de consultation pénale."
          />
        </div>

        <SiteFooter />
      </main>
    </LangProvider>
  );
}
