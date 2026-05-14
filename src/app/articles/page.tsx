import { getAllArticles } from "../utils/articles";
import ArticlesHeader from "./ArticlesHeader";
import SiteFooter from "./SiteFooter";
import { LangProvider } from "./LangContext";
import ArticlesListClient from "./ArticlesListClient";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function ArticlesPage() {
  const articles = getAllArticles();
  return (
    <LangProvider>
      <main className="min-h-screen bg-blanc text-noir font-riviera">
        <ArticlesHeader />
        <ArticlesListClient articles={articles} />
        <SiteFooter />
      </main>
    </LangProvider>
  );
}
