import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /articles temporairement disallow — accessible par lien direct uniquement,
        // mais non indexable par les moteurs de recherche.
        disallow: ["/cms", "/admin", "/api/", "/articles"],
      },
    ],
    sitemap: "https://www.vmdl.ai/sitemap.xml",
    host: "https://www.vmdl.ai",
  };
}
