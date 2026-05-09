export interface Topic {
  sector:
    | "football"
    | "international-qatar"
    | "international-usa"
    | "international-bresil"
    | "penal-general"
    | "penal-presse-reputation"
    | "penal-affaires"
    | "immobilier-international";
  label: string;
  brief: string;
  audience: string;
  exampleAngles: string[];
}

export const TOPICS: Topic[] = [
  {
    sector: "football",
    label: "Droit du sport / footballeurs",
    brief:
      "Actualité juridique récente concernant le football professionnel : décisions FIFA/UEFA/CJUE, réformes des règlements, transferts, contrats, droits à l'image, agents, contentieux entre clubs et joueurs.",
    audience: "footballeurs professionnels, agents, dirigeants de clubs, avocats sportifs",
    exampleAngles: [
      "Suite récente du règlement FIFA sur les agents (FFAR)",
      "Affaires de transfert ou rupture de contrat médiatisées",
      "Évolutions du salary cap, fair-play financier, DNCG",
      "Multi-club ownership et conflits d'intérêts",
    ],
  },
  {
    sector: "international-qatar",
    label: "Affaires Qatar / Moyen-Orient",
    brief:
      "Actualité du droit des affaires, immobilier, sport ou investissements au Qatar et plus largement Moyen-Orient (Émirats, Arabie saoudite). Réformes locales, opportunités pour entrepreneurs et investisseurs français.",
    audience:
      "entrepreneurs, investisseurs et personnalités françaises actifs au Moyen-Orient",
    exampleAngles: [
      "Régime juridique de l'investissement immobilier au Qatar",
      "Structuration d'un projet sportif ou commercial dans le Golfe",
      "Conformité OFAC et fiscalité dual-residency France/Golfe",
      "Sponsoring et droits TV en Saudi Pro League ou QSL",
    ],
  },
  {
    sector: "international-usa",
    label: "Affaires États-Unis",
    brief:
      "Actualité du droit des affaires, fiscal, immigration, immobilier et sportif aux États-Unis touchant les Français : visas (E-2, O-1), structuration de société, fiscalité, transferts vers MLS / NBA.",
    audience: "Français entrepreneurs, sportifs ou investisseurs aux États-Unis",
    exampleAngles: [
      "Visa O-1 / E-2 pour entrepreneurs et sportifs",
      "Structuration LLC pour un Français : risques fiscaux",
      "MLS et droits du joueur étranger",
      "Litiges immobiliers transfrontaliers France/US",
    ],
  },
  {
    sector: "international-bresil",
    label: "Affaires Brésil / Amérique latine",
    brief:
      "Actualité du droit des affaires, sport, immobilier ou investissement au Brésil et en Amérique latine : règles FIFA spécifiques, mécanisme de solidarité, terceira propriedade, formation des jeunes joueurs, investissements transfrontaliers.",
    audience:
      "investisseurs et clubs européens en lien avec l'Amérique latine, joueurs sud-américains",
    exampleAngles: [
      "Mécanisme de solidarité FIFA pour clubs formateurs sud-américains",
      "Statut TPO/TPI et financement des joueurs",
      "Investissement immobilier au Brésil pour Français",
      "Litiges contractuels franco-brésiliens",
    ],
  },
  {
    sector: "penal-general",
    label: "Droit pénal général",
    brief:
      "Actualité du droit pénal général touchant des personnalités, des sportifs ou plus largement le justiciable : violences, atteintes aux biens, procédure pénale, garde à vue, mise en examen, enquête préliminaire.",
    audience: "particuliers et personnalités confrontés à un risque pénal",
    exampleAngles: [
      "Que faire en cas de garde à vue : les premiers réflexes",
      "Mise en examen vs témoin assisté : conséquences pratiques",
      "Évolutions récentes de la procédure pénale en France",
      "Violences sur terrain : faute de jeu ou infraction pénale ?",
    ],
  },
  {
    sector: "penal-presse-reputation",
    label: "Réputation, presse, cyber-harcèlement",
    brief:
      "Actualité du droit de la presse, de l'e-réputation, de la diffamation, du cyber-harcèlement, des deepfakes et de la protection de la vie privée des personnalités publiques (loi 1881, art. 9 C. civ., LCEN, RGPD).",
    audience:
      "personnalités publiques, sportifs, dirigeants confrontés à des attaques médiatiques ou en ligne",
    exampleAngles: [
      "Cyberharcèlement d'une personnalité : les actions à enclencher",
      "Deepfakes et droit français : que faire en 2026",
      "Diffamation publique : référé d'heure à heure et fond",
      "Droit à l'oubli appliqué aux sportifs",
    ],
  },
  {
    sector: "penal-affaires",
    label: "Droit pénal des affaires",
    brief:
      "Actualité du droit pénal des affaires : abus de biens sociaux, blanchiment, corruption, fraude fiscale, escroquerie, manquements réglementaires touchant les dirigeants et entreprises.",
    audience: "dirigeants d'entreprise, entrepreneurs, conseils d'administration",
    exampleAngles: [
      "Convention judiciaire d'intérêt public : où en est-on ?",
      "Blanchiment et obligations Tracfin pour les avocats",
      "Abus de biens sociaux : zones grises pour le dirigeant",
      "Lanceur d'alerte et procédure pénale",
    ],
  },
  {
    sector: "immobilier-international",
    label: "Immobilier international",
    brief:
      "Actualité du droit immobilier transfrontalier : acquisition par un Français à l'étranger, par un étranger en France, fiscalité, structuration, régimes matrimoniaux, succession internationale.",
    audience:
      "investisseurs immobiliers franco-internationaux, family offices, particuliers UHNW",
    exampleAngles: [
      "Acquisition d'un bien à Dubaï par un résident fiscal français",
      "Régime matrimonial international et acquisition immobilière",
      "Successions internationales : règlement européen 650/2012 en pratique",
      "Fiscalité d'une SCI familiale détenant des biens à l'étranger",
    ],
  },
];

export function pickTopicForDate(date: Date = new Date()): Topic {
  const dayBucket = Math.floor(date.getTime() / (2 * 24 * 60 * 60 * 1000));
  return TOPICS[dayBucket % TOPICS.length];
}
