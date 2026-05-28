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
  const articles = getAllArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const sectionPages: MetadataRoute.Sitemap = HOME_SECTIONS.map((s) => ({
    url: `${SITE_URL}/?section=${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // /articles is split into two visible, anchored sections so search
  // engines can surface them as distinct sitelinks under /articles.
  const articleSections: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/articles#penal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/articles#football`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticPages, ...sectionPages, ...articleSections, ...articlePages];
}
