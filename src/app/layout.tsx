import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.scss";
import WhatsAppFab from "./Components/WhatsAppFab";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vmdl.ai"),
  title: {
    default: "VMDL - Cabinet d'avocat | Maître Vincent Machado Da Luz",
    template: "%s | VMDL",
  },
  applicationName: "VMDL",
  description:
    "VMDL est un cabinet d'avocat parisien et international, spécialisé dans le conseil aux footballeurs professionnels, le contentieux pénal et les affaires immobilières internationales. Fondé par Maître Vincent Machado Da Luz.",
  keywords: [
    "avocat footballeur",
    "cabinet avocat Paris",
    "avocat sportif",
    "Vincent Machado Da Luz",
    "VMDL",
    "droit du sport",
    "contentieux pénal",
    "avocat à la cour",
    "représentation footballeur professionnel",
  ],
  authors: [{ name: "Vincent Machado Da Luz" }],
  creator: "VMDL",
  publisher: "VMDL",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico?v=2",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.vmdl.ai",
    siteName: "VMDL",
    title: "VMDL - Cabinet d'avocat | Maître Vincent Machado Da Luz",
    description:
      "Cabinet d'avocat parisien et international, spécialisé dans la représentation des footballeurs professionnels, le contentieux pénal et les affaires internationales.",
    images: [
      {
        url: "/images/vmdl-logo.png",
        width: 1200,
        height: 630,
        alt: "VMDL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VMDL - Cabinet d'avocat",
    description:
      "Cabinet d'avocat spécialisé dans la représentation des footballeurs professionnels, le contentieux pénal et les affaires internationales.",
    images: ["/images/vmdl-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "OYmOj1EPhWG-OzpQVSENCUw5lP3iQkAKMgRyMl2VEjM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030303",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VMDL",
  alternateName: ["VMDL - Law firm & Cover group", "Cabinet VMDL"],
  url: "https://www.vmdl.ai",
  inLanguage: "fr-FR",
  publisher: {
    "@type": "Organization",
    name: "VMDL",
    logo: {
      "@type": "ImageObject",
      url: "https://www.vmdl.ai/images/vmdl-logo.png",
    },
  },
};

// Section anchors of the single-page home, exposed as structured data so
// search engines can surface them as sitelinks under the main result.
const HOME_SECTIONS = [
  { id: "cabinet", name: "Le cabinet", description: "Présentation du cabinet VMDL, ses valeurs et son approche du droit." },
  { id: "expertise", name: "Expertises", description: "Conseil en contrats sportifs (football), contentieux pénal, droit de la famille, droit des étrangers et droit des affaires." },
  { id: "vision", name: "Vision", description: "La vision du cabinet : excellence, agilité et innovation au service du client." },
  { id: "fondateur", name: "Le fondateur", description: "Maître Vincent Machado Da Luz, avocat à la Cour, ancien footballeur de haut niveau." },
  { id: "honoraires", name: "Honoraires", description: "Modalités d'intervention et de rémunération du cabinet (taux horaire, forfait, honoraire de résultat)." },
  { id: "contact", name: "Contact", description: "Prendre contact avec le cabinet VMDL à Paris." },
] as const;

const siteNavigationLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VMDL — Navigation principale",
  url: "https://www.vmdl.ai",
  itemListElement: [
    ...HOME_SECTIONS.map((s, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: s.name,
      description: s.description,
      url: `https://www.vmdl.ai/?section=${s.id}`,
    })),
    {
      "@type": "SiteNavigationElement",
      position: HOME_SECTIONS.length + 1,
      name: "Articles",
      description: "Articles, analyses et publications du cabinet en droit du sport, droit pénal et droit des affaires.",
      url: "https://www.vmdl.ai/articles",
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    ...HOME_SECTIONS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      item: `https://www.vmdl.ai/?section=${s.id}`,
    })),
    {
      "@type": "ListItem",
      position: HOME_SECTIONS.length + 1,
      name: "Articles",
      item: "https://www.vmdl.ai/articles",
    },
  ],
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VMDL",
  alternateName: "VMDL - Law firm & Cover group",
  url: "https://www.vmdl.ai",
  logo: "https://www.vmdl.ai/images/vmdl-logo.png",
  sameAs: [
    "https://www.instagram.com/v.machadodaluz/",
    "https://www.linkedin.com/in/vincent-machado-da-luz-550a942a2/",
  ],
};

const legalServiceLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "VMDL",
  alternateName: "VMDL - Law firm & Cover group",
  legalName: "Cabinet VMDL",
  description:
    "Cabinet d'avocat parisien et international spécialisé dans la représentation des footballeurs professionnels, le contentieux pénal et les affaires internationales.",
  url: "https://www.vmdl.ai",
  logo: "https://www.vmdl.ai/images/vmdl-logo.png",
  image: "https://www.vmdl.ai/images/vmdl-logo.png",
  email: "cabinet@vmdl.ai",
  telephone: "+33 7 57 41 72 87",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Rue de Poissy",
    addressLocality: "Paris",
    postalCode: "75005",
    addressCountry: "FR",
  },
  founder: {
    "@type": "Person",
    name: "Vincent Machado Da Luz",
    jobTitle: "Avocat à la Cour",
  },
  areaServed: ["FR", "QA", "US", "BR", "AE"],
  sameAs: [
    "https://www.instagram.com/v.machadodaluz/",
    "https://www.linkedin.com/in/vincent-machado-da-luz-550a942a2/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" as="image" href="/images/background.webp" media="(min-width: 769px)" />
        <link rel="preload" as="image" href="/images/home/pariseiffel.webp" media="(max-width: 768px)" />
        <link
          rel="preload"
          as="font"
          href="/font/rivieraNight/RivieraNights-Light.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteLd)}
        </Script>
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(organizationLd)}
        </Script>
        <Script
          id="ld-legal-service"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(legalServiceLd)}
        </Script>
        <Script
          id="ld-site-navigation"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(siteNavigationLd)}
        </Script>
        <Script
          id="ld-breadcrumb"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(breadcrumbLd)}
        </Script>
      </head>
      <body>
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
