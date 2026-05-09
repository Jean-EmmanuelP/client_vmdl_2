import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Publications",
  description:
    "Articles, analyses et publications du cabinet VMDL sur le droit du sport, le contentieux pénal et les affaires internationales.",
  alternates: {
    canonical: "/articles",
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
  return <>{children}</>;
}
