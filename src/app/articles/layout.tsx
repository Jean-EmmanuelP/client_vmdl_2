import type { Metadata } from "next";
import WhatsAppFab from "../Components/WhatsAppFab";

export const metadata: Metadata = {
  title: "Articles & Publications",
  description:
    "Articles, analyses et publications du cabinet VMDL sur le droit du sport, le contentieux pénal et les affaires internationales.",
  alternates: {
    canonical: "/articles",
  },
  // /articles temporairement non indexable — accessible par lien direct uniquement.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Articles & Publications | VMDL",
    description:
      "Articles, analyses et publications du cabinet VMDL sur le droit du sport, le contentieux pénal et les affaires internationales.",
    type: "website",
    url: "https://www.vmdl.ai/articles",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="articles-section">
      {children}
      <WhatsAppFab />
    </div>
  );
}
