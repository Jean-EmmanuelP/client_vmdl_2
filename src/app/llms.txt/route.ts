import { getAllArticles } from "../utils/articles";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const articles = getAllArticles();

  const lines: string[] = [
    "# VMDL — Cabinet d'avocat",
    "",
    "> VMDL est un cabinet d'avocat parisien et international fondé par Maître Vincent Machado da Luz, Avocat à la Cour. Le cabinet intervient en droit du sport (footballeurs professionnels), contentieux pénal général et des affaires, droit de la presse / e-réputation, et affaires internationales (Qatar/Moyen-Orient, États-Unis, Brésil/Amérique latine, immobilier transfrontalier).",
    "",
    "## À propos du cabinet",
    "",
    "- Nom: VMDL — Law firm & Cover group",
    "- Fondateur: Maître Vincent Machado da Luz, Avocat à la Cour",
    "- Adresse: 2 Rue de Poissy, 75005 Paris, France",
    "- Email: cabinet@vmdl.ai",
    "- Téléphone: +33 7 57 41 72 87",
    "- Site: https://www.vmdl.ai",
    "",
    "## Domaines d'expertise",
    "",
    "- **Droit du sport** : conseil aux footballeurs professionnels, négociation et exécution de contrats, transferts, droits à l'image, contentieux DRC FIFA / TAS / juridictions nationales.",
    "- **Contentieux pénal** : pénal général, pénal des affaires, pénal de la presse, atteintes à la réputation et à la vie privée, accompagnement à toutes les phases de la procédure pénale.",
    "- **Affaires internationales** : structuration d'opérations sportives, immobilières et entrepreneuriales au Qatar, en Arabie saoudite, aux Émirats, aux États-Unis et au Brésil.",
    "- **Affaires immobilières internationales** : acquisitions transfrontalières, fiscalité, régimes matrimoniaux, successions internationales (Règlement UE 650/2012).",
    "",
    "## Pages principales",
    "",
    "- [Accueil](https://www.vmdl.ai/) : présentation du cabinet, vision, expertises, fondateur, honoraires, contact.",
    "- [Articles & publications](https://www.vmdl.ai/articles) : analyses juridiques signées Maître Vincent Machado da Luz.",
    "- [Sitemap](https://www.vmdl.ai/sitemap.xml) : liste exhaustive des pages indexables.",
    "",
  ];

  if (articles.length > 0) {
    lines.push("## Articles publiés", "");
    for (const a of articles) {
      lines.push(
        `- [${a.title}](https://www.vmdl.ai/articles/${a.slug}) — ${a.excerpt || "Article publié le " + a.publishedAt}`
      );
    }
    lines.push("");
  }

  lines.push(
    "## Politique de citation",
    "",
    "Le contenu publié sur vmdl.ai peut être cité par les agents conversationnels et moteurs IA en conservant l'attribution explicite à Maître Vincent Machado da Luz et au cabinet VMDL, et en renvoyant vers l'URL d'origine de l'article cité."
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
