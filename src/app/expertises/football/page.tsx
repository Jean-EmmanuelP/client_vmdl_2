import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ArticlesHeader from "../../articles/ArticlesHeader";
import SiteFooter from "../../articles/SiteFooter";
import { LangProvider } from "../../articles/LangContext";
import ContactCTA from "../../Components/ContactCTA";

const URL = "https://www.vmdl.ai/expertises/football";

export const metadata: Metadata = {
  title:
    "Avocat footballeur professionnel Paris — Droit du sport | VMDL",
  description:
    "Avocat des footballeurs professionnels à Paris. Contrats, transferts, mécanisme de solidarité FIFA, indemnités de formation, litiges agents-clubs-joueurs. Maître Vincent Machado Da Luz.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: "Avocat footballeur professionnel Paris — VMDL",
    description:
      "Cabinet d'avocat dédié aux footballeurs professionnels : contrats, transferts, FIFA, contentieux disciplinaire et sportif.",
    images: [{ url: "https://www.vmdl.ai/images/vmdl-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avocat footballeur professionnel Paris — VMDL",
    description:
      "Contrats, transferts, FIFA, contentieux disciplinaire et sportif.",
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": URL,
  name: "VMDL — Droit du sport (football)",
  alternateName: "Avocat footballeur professionnel Paris",
  description:
    "Cabinet VMDL — avocat des footballeurs professionnels : contrats, transferts, FIFA, mécanisme de solidarité, contentieux disciplinaire et sportif.",
  serviceType: "Sports Law",
  url: URL,
  areaServed: ["FR", "BR", "QA", "AE"],
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
    name: "Domaines du droit du sport — football",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contrats des footballeurs professionnels (travail, droits image, sponsoring)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transferts internationaux et règlement FIFA (RSTP)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mécanisme de solidarité FIFA et indemnités de formation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relations agents, clubs et joueurs (FFAR)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contentieux disciplinaire (DRC, CRL, TAS, CNOSF)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Veille juridique du football professionnel" } },
    ],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "VMDL", item: "https://www.vmdl.ai" },
    { "@type": "ListItem", position: 2, name: "Expertises", item: "https://www.vmdl.ai/expertises" },
    { "@type": "ListItem", position: 3, name: "Football", item: URL },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que le mécanisme de solidarité FIFA ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Le mécanisme de solidarité prévu par le Règlement du Statut et du Transfert des Joueurs (RSTP) de la FIFA prévoit qu'à chaque transfert international d'un joueur sous contrat avant ses 23 ans, 5 % de l'indemnité de transfert est redistribuée aux clubs ayant participé à sa formation entre 12 et 23 ans. Le cabinet VMDL accompagne les clubs formateurs dans la revendication et le recouvrement de ces sommes.",
      },
    },
    {
      "@type": "Question",
      name: "Le cabinet peut-il intervenir comme avocat-mandataire sur un transfert ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Oui, dans le cadre d'une convention tripartite avocat–joueur–club, le cabinet peut conseiller juridiquement le joueur sur tous les aspects de son transfert : analyse du contrat, négociation des clauses, droits image, sponsoring, contentieux post-transfert. L'avocat agit dans le respect du secret professionnel et des règles déontologiques.",
      },
    },
    {
      "@type": "Question",
      name: "Que faire en cas de litige avec un agent ou un club ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Selon la nature du litige, plusieurs voies sont possibles : Chambre nationale de résolution des litiges (CNRL), Commission juridique de la FFF, FIFA DRC (Dispute Resolution Chamber), TAS (Tribunal arbitral du sport). Le cabinet VMDL accompagne le joueur ou le club dans le choix de la juridiction compétente et la stratégie contentieuse.",
      },
    },
    {
      "@type": "Question",
      name: "Que change le règlement FIFA sur les agents (FFAR) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Le FIFA Football Agents Regulations encadre depuis 2023 l'activité des agents : plafonnement des commissions, examen obligatoire, transparence sur les conflits d'intérêts. Le cabinet VMDL accompagne les joueurs dans la sécurisation juridique de leur relation avec leur agent et dans la régularisation des contrats existants.",
      },
    },
  ],
};

const PRACTICE_AREAS = [
  {
    n: "01",
    title: "Contrats des footballeurs professionnels",
    body:
      "Rédaction, négociation et révision des contrats de travail, droits image, sponsoring et primes de performance. Sécurisation juridique du joueur dans la convention tripartite avocat–joueur–club.",
  },
  {
    n: "02",
    title: "Transferts internationaux & RSTP",
    body:
      "Application du Règlement du Statut et du Transfert des Joueurs FIFA : conditions du transfert, périodes d'enregistrement, indemnités de rupture (article 17), clauses libératoires.",
  },
  {
    n: "03",
    title: "Solidarité & indemnités de formation",
    body:
      "Recouvrement des sommes dues aux clubs formateurs au titre de la solidarité (5 %) et de l'indemnité de formation. Accompagnement des clubs sud-américains et européens dans la revendication FIFA.",
  },
  {
    n: "04",
    title: "Relations agents · FFAR",
    body:
      "Cadre du FIFA Football Agents Regulations : plafonds de commission, conflits d'intérêts, contrats de représentation. Régularisation des relations agent–joueur–club existantes.",
  },
  {
    n: "05",
    title: "Contentieux disciplinaire & sportif",
    body:
      "Représentation devant FIFA DRC, CRL, Commission juridique FFF, CNOSF, TAS. Sanctions disciplinaires, dopage, intégrité des compétitions, contestation des décisions arbitrales sportives.",
  },
  {
    n: "06",
    title: "Veille juridique du football",
    body:
      "Suivi continu des décisions FIFA, UEFA, CJUE (Bosman, Diarra), des réformes du fair-play financier, du salary cap, du multi-club ownership et de tout impact réglementaire sur la carrière du joueur.",
  },
];

const FAQ = [
  {
    q: "Qu'est-ce que le mécanisme de solidarité FIFA ?",
    a:
      "Le mécanisme de solidarité prévu par le RSTP FIFA prévoit qu'à chaque transfert international d'un joueur sous contrat avant ses 23 ans, 5 % de l'indemnité est redistribuée aux clubs ayant participé à sa formation entre 12 et 23 ans. Le cabinet VMDL accompagne les clubs formateurs dans la revendication et le recouvrement de ces sommes.",
  },
  {
    q: "Le cabinet peut-il intervenir comme avocat-mandataire sur un transfert ?",
    a:
      "Oui, dans le cadre d'une convention tripartite avocat–joueur–club, le cabinet conseille juridiquement le joueur sur tous les aspects du transfert : analyse du contrat, négociation des clauses, droits image, sponsoring, contentieux post-transfert. L'avocat agit dans le respect du secret professionnel et des règles déontologiques.",
  },
  {
    q: "Que faire en cas de litige avec un agent ou un club ?",
    a:
      "Selon la nature du litige : CNRL, Commission juridique FFF, FIFA DRC, TAS. Le cabinet VMDL accompagne le joueur ou le club dans le choix de la juridiction compétente et la stratégie contentieuse.",
  },
  {
    q: "Que change le règlement FIFA sur les agents (FFAR) ?",
    a:
      "Le FIFA Football Agents Regulations encadre depuis 2023 l'activité des agents : plafonnement des commissions, examen obligatoire, transparence sur les conflits d'intérêts. Le cabinet VMDL accompagne les joueurs dans la sécurisation juridique de leur relation avec leur agent.",
  },
];

export default function FootballPage() {
  return (
    <LangProvider>
      <Script id="ld-service-football" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="ld-breadcrumb-football" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbLd)}
      </Script>
      <Script id="ld-faq-football" type="application/ld+json" strategy="beforeInteractive">
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
              Football — Droit du sport
            </h1>
            <p className="mt-5 max-w-2xl text-[14px] sm:text-[17px] leading-[1.7] font-light text-noir/70">
              Cabinet d'avocat dédié aux footballeurs professionnels, agents et
              clubs : contrats, transferts FIFA, mécanisme de solidarité,
              contentieux disciplinaire et sportif. Vincent Machado Da Luz est
              ancien footballeur de haut niveau.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/33757417287?text=${encodeURIComponent(
                  "Bonjour Maître, je souhaite être rappelé concernant un dossier football.\n\nContexte : [contrat / transfert / agent / contentieux / autre]\nNom : "
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
            <h2 id="domaines-heading" className="uppercase text-[22px] sm:text-[30px] leading-[1.15] font-light border-t border-noir/15 pt-6">
              Six axes en droit du football
            </h2>
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {PRACTICE_AREAS.map((p) => (
              <li key={p.n} className="border-t border-noir/10 pt-5">
                <p className="text-[11px] tracking-[0.25em] text-noir/40 mb-2">{p.n}</p>
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
            <h2 id="faq-heading" className="uppercase text-[22px] sm:text-[30px] leading-[1.15] font-light border-t border-noir/15 pt-6">
              Questions fréquentes
            </h2>
          </header>
          <dl className="divide-y divide-noir/10">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="text-[14px] sm:text-[16px] font-medium mb-2">{item.q}</dt>
                <dd className="text-[13px] sm:text-[14px] leading-[1.7] font-light text-noir/70 max-w-3xl">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16">
          <div className="border-t border-noir/15 pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
            <div>
              <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.3em] text-noir/40 mb-2">
                Pour aller plus loin
              </p>
              <h2 className="uppercase text-[20px] sm:text-[26px] leading-[1.15] font-light">
                Articles & actualités football
              </h2>
              <p className="mt-3 max-w-xl text-[13px] sm:text-[14px] leading-[1.7] font-light text-noir/65">
                Décisions FIFA, transferts médiatisés, mécanisme de solidarité,
                réformes du règlement. Veille juridique tenue par le cabinet.
              </p>
            </div>
            <Link
              href="/articles#football"
              className="self-start inline-flex items-center gap-2 border border-noir/30 text-noir px-5 py-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] hover:bg-noir hover:text-blanc transition"
            >
              Lire les articles football →
            </Link>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28">
          <ContactCTA
            variant="default"
            eyebrow="Cabinet VMDL — joindre l'avocat sportif"
            title="Contrat, transfert, contentieux disciplinaire ?"
            body="Maître Vincent Machado Da Luz, ancien footballeur de haut niveau, accompagne les joueurs, agents et clubs sur l'intégralité de leurs dossiers sportifs et contractuels."
          />
        </div>

        <SiteFooter />
      </main>
    </LangProvider>
  );
}
