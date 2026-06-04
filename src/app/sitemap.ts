import type { MetadataRoute } from "next";
import { getAllArticles } from "./utils/articles";

const SITE_URL = "https://www.vmdl.ai";

// Section anchors of the single-page home. Listed as distinct URLs so
// search engines can index each one as a deep-link target and surface
// them as sitelinks under the main result.
const HOME_SECTIONS = [
  "cabinet",
  "expertise",
  "vision",
  "fondateur",
  "honoraires",
  "contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // const articles = getAllArticles(); // /articles temporairement retiré du sitemap

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // /articles temporairement retiré du sitemap — accessible par lien direct uniquement.
    // {
    //   url: `${SITE_URL}/articles`,
    //   lastModified: now,
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
    {
      url: `${SITE_URL}/expertises`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/expertises/contentieux-penal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/expertises/football`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const sectionPages: MetadataRoute.Sitemap = HOME_SECTIONS.map((s) => ({
    url: `${SITE_URL}/?section=${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // /articles#penal et /articles#football temporairement retirés du sitemap.
  // const articleSections: MetadataRoute.Sitemap = [
  //   { url: `${SITE_URL}/articles#penal`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
  //   { url: `${SITE_URL}/articles#football`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
  // ];

  // Pages d'articles individuelles temporairement retirées du sitemap.
  // const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
  //   url: `${SITE_URL}/articles/${a.slug}`,
  //   lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
  //   changeFrequency: "yearly",
  //   priority: 0.7,
  // }));

  return [...staticPages, ...sectionPages];
}
