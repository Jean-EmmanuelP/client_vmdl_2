export type LangueCode =
  | "FR"
  | "EN"
  | "IT"
  | "ES"
  | "عربي"
  | "PT"
  | "DE"
  | "中文";

export const ARTICLE_LOCALES: LangueCode[] = [
  "FR",
  "EN",
  "IT",
  "ES",
  "عربي",
  "PT",
  "DE",
  "中文",
];

export const langCodeMap: { [key in LangueCode]: string } = {
  FR: "fr",
  EN: "en",
  IT: "it",
  ES: "es",
  عربي: "ar",
  PT: "pt",
  DE: "de",
  中文: "zh",
};

export const htmlLangMap: { [key in LangueCode]: string } = {
  FR: "fr-FR",
  EN: "en-US",
  IT: "it-IT",
  ES: "es-ES",
  عربي: "ar",
  PT: "pt-PT",
  DE: "de-DE",
  中文: "zh-CN",
};

export const localeDateMap: { [key in LangueCode]: string } = {
  FR: "fr-FR",
  EN: "en-US",
  IT: "it-IT",
  ES: "es-ES",
  عربي: "ar-EG",
  PT: "pt-PT",
  DE: "de-DE",
  中文: "zh-CN",
};

export interface I18nLabels {
  cabinet: string;
  expertises: string;
  vision: string;
  fondateur: string;
  honoraires: string;
  contact: string;
  articles: string;
  publications: string;
  articlesPublications: string;
  introList: string;
  emptyTitle: string;
  emptyBody: string;
  minRead: string;
  readArticle: string;
  backToAll: string;
  backToSite: string;
  keyTakeaways: string;
  keywords: string;
  sourcesConsulted: string;
  relatedArticles: string;
  language: string;
  notFoundTitle: string;
  notFoundBody: string;
  viewAllArticles: string;
  legalMentions: string;
  cabinetSubtitle: string;
  cabinetTitle: string;
  notTranslatedNotice: string;
}

const FALLBACK_FR: I18nLabels = {
  cabinet: "Le cabinet",
  expertises: "Expertises",
  vision: "Vision",
  fondateur: "Le fondateur",
  honoraires: "Honoraires",
  contact: "Contact",
  articles: "Articles",
  publications: "Publications",
  articlesPublications: "Articles & Publications",
  introList:
    "Analyses, perspectives et actualités juridiques rédigées par Maître Vincent Machado da Luz et le cabinet VMDL.",
  emptyTitle: "À paraître",
  emptyBody:
    "Les premières publications du cabinet seront prochainement disponibles ici.",
  minRead: "min de lecture",
  readArticle: "Lire l'article",
  backToAll: "← Tous les articles",
  backToSite: "← Retour au site",
  keyTakeaways: "Ce qu'il faut retenir",
  keywords: "Mots-clés",
  sourcesConsulted: "Sources consultées",
  relatedArticles: "Articles liés",
  language: "Langue",
  notFoundTitle: "Article introuvable",
  notFoundBody: "Cet article n'existe pas ou a été retiré.",
  viewAllArticles: "Voir tous les articles",
  legalMentions: "Mentions légales",
  cabinetSubtitle: "Cabinet d'avocat",
  cabinetTitle: "VMDL - Law firm & Cover group",
  notTranslatedNotice:
    "Cet article n'est pas encore disponible dans votre langue. Version française affichée par défaut.",
};

export const LABELS: { [key in LangueCode]: I18nLabels } = {
  FR: FALLBACK_FR,
  EN: {
    cabinet: "The firm",
    expertises: "Expertise",
    vision: "Vision",
    fondateur: "Founder",
    honoraires: "Fees",
    contact: "Contact",
    articles: "Articles",
    publications: "Publications",
    articlesPublications: "Articles & Publications",
    introList:
      "Analyses, perspectives and legal updates by Vincent Machado da Luz and VMDL.",
    emptyTitle: "Coming soon",
    emptyBody:
      "The firm's first publications will be available here shortly.",
    minRead: "min read",
    readArticle: "Read the article",
    backToAll: "← All articles",
    backToSite: "← Back to home",
    keyTakeaways: "Key takeaways",
    keywords: "Keywords",
    sourcesConsulted: "Sources consulted",
    relatedArticles: "Related articles",
    language: "Language",
    notFoundTitle: "Article not found",
    notFoundBody: "This article does not exist or has been removed.",
    viewAllArticles: "View all articles",
    legalMentions: "Legal notice",
    cabinetSubtitle: "Law firm",
    cabinetTitle: "VMDL - Law firm & Cover group",
    notTranslatedNotice:
      "This article is not yet available in your language. French version shown by default.",
  },
  IT: {
    cabinet: "Lo studio",
    expertises: "Competenze",
    vision: "Visione",
    fondateur: "Il fondatore",
    honoraires: "Onorari",
    contact: "Contatti",
    articles: "Articoli",
    publications: "Pubblicazioni",
    articlesPublications: "Articoli e Pubblicazioni",
    introList:
      "Analisi, prospettive e attualità giuridiche redatte dall'Avv. Vincent Machado da Luz e dallo studio VMDL.",
    emptyTitle: "Prossimamente",
    emptyBody: "Le prime pubblicazioni dello studio saranno presto disponibili.",
    minRead: "min di lettura",
    readArticle: "Leggi l'articolo",
    backToAll: "← Tutti gli articoli",
    backToSite: "← Torna al sito",
    keyTakeaways: "Da ricordare",
    keywords: "Parole chiave",
    sourcesConsulted: "Fonti consultate",
    relatedArticles: "Articoli correlati",
    language: "Lingua",
    notFoundTitle: "Articolo non trovato",
    notFoundBody: "Questo articolo non esiste o è stato rimosso.",
    viewAllArticles: "Vedi tutti gli articoli",
    legalMentions: "Note legali",
    cabinetSubtitle: "Studio legale",
    cabinetTitle: "VMDL - Law firm & Cover group",
    notTranslatedNotice:
      "Questo articolo non è ancora disponibile nella sua lingua. Versione francese mostrata per impostazione predefinita.",
  },
  ES: {
    cabinet: "El despacho",
    expertises: "Áreas de práctica",
    vision: "Visión",
    fondateur: "El fundador",
    honoraires: "Honorarios",
    contact: "Contacto",
    articles: "Artículos",
    publications: "Publicaciones",
    articlesPublications: "Artículos y Publicaciones",
    introList:
      "Análisis, perspectivas y actualidad jurídica del Mtro. Vincent Machado da Luz y del despacho VMDL.",
    emptyTitle: "Próximamente",
    emptyBody:
      "Las primeras publicaciones del despacho estarán disponibles aquí en breve.",
    minRead: "min de lectura",
    readArticle: "Leer el artículo",
    backToAll: "← Todos los artículos",
    backToSite: "← Volver al sitio",
    keyTakeaways: "Lo que hay que recordar",
    keywords: "Palabras clave",
    sourcesConsulted: "Fuentes consultadas",
    relatedArticles: "Artículos relacionados",
    language: "Idioma",
    notFoundTitle: "Artículo no encontrado",
    notFoundBody: "Este artículo no existe o ha sido retirado.",
    viewAllArticles: "Ver todos los artículos",
    legalMentions: "Aviso legal",
    cabinetSubtitle: "Despacho de abogados",
    cabinetTitle: "VMDL - Law firm & Cover group",
    notTranslatedNotice:
      "Este artículo aún no está disponible en su idioma. Se muestra la versión francesa por defecto.",
  },
  عربي: {
    cabinet: "المكتب",
    expertises: "التخصصات",
    vision: "الرؤية",
    fondateur: "المؤسس",
    honoraires: "الأتعاب",
    contact: "اتصل",
    articles: "مقالات",
    publications: "منشورات",
    articlesPublications: "المقالات والمنشورات",
    introList:
      "تحليلات وآفاق ومستجدات قانونية بقلم الأستاذ فينسنت ماشادو دا لوز ومكتب VMDL.",
    emptyTitle: "قريبًا",
    emptyBody: "ستتوفر المنشورات الأولى للمكتب هنا قريبًا.",
    minRead: "دقيقة قراءة",
    readArticle: "اقرأ المقال",
    backToAll: "← جميع المقالات",
    backToSite: "← العودة إلى الموقع",
    keyTakeaways: "ما يجب تذكره",
    keywords: "كلمات مفتاحية",
    sourcesConsulted: "المصادر المستشهد بها",
    relatedArticles: "مقالات ذات صلة",
    language: "اللغة",
    notFoundTitle: "المقال غير موجود",
    notFoundBody: "هذا المقال غير موجود أو تمت إزالته.",
    viewAllArticles: "عرض جميع المقالات",
    legalMentions: "إشعار قانوني",
    cabinetSubtitle: "مكتب محاماة",
    cabinetTitle: "VMDL - مكتب محاماة",
    notTranslatedNotice:
      "هذا المقال غير متوفر بعد بلغتك. يتم عرض النسخة الفرنسية افتراضيًا.",
  },
  PT: {
    cabinet: "O escritório",
    expertises: "Especialidades",
    vision: "Visão",
    fondateur: "O fundador",
    honoraires: "Honorários",
    contact: "Contato",
    articles: "Artigos",
    publications: "Publicações",
    articlesPublications: "Artigos e Publicações",
    introList:
      "Análises, perspectivas e atualidades jurídicas redigidas pelo Dr. Vincent Machado da Luz e pelo escritório VMDL.",
    emptyTitle: "Em breve",
    emptyBody:
      "As primeiras publicações do escritório estarão disponíveis aqui em breve.",
    minRead: "min de leitura",
    readArticle: "Ler o artigo",
    backToAll: "← Todos os artigos",
    backToSite: "← Voltar ao site",
    keyTakeaways: "O que reter",
    keywords: "Palavras-chave",
    sourcesConsulted: "Fontes consultadas",
    relatedArticles: "Artigos relacionados",
    language: "Idioma",
    notFoundTitle: "Artigo não encontrado",
    notFoundBody: "Este artigo não existe ou foi removido.",
    viewAllArticles: "Ver todos os artigos",
    legalMentions: "Aviso legal",
    cabinetSubtitle: "Escritório de advocacia",
    cabinetTitle: "VMDL - Escritório de advocacia",
    notTranslatedNotice:
      "Este artigo ainda não está disponível no seu idioma. Versão francesa exibida por padrão.",
  },
  DE: {
    cabinet: "Die Kanzlei",
    expertises: "Fachgebiete",
    vision: "Vision",
    fondateur: "Der Gründer",
    honoraires: "Honorare",
    contact: "Kontakt",
    articles: "Artikel",
    publications: "Publikationen",
    articlesPublications: "Artikel & Publikationen",
    introList:
      "Analysen, Perspektiven und rechtliche Aktualitäten von Maître Vincent Machado da Luz und der Kanzlei VMDL.",
    emptyTitle: "Demnächst",
    emptyBody:
      "Die ersten Publikationen der Kanzlei werden hier in Kürze verfügbar sein.",
    minRead: "Min. Lesezeit",
    readArticle: "Artikel lesen",
    backToAll: "← Alle Artikel",
    backToSite: "← Zurück zur Startseite",
    keyTakeaways: "Wichtigste Erkenntnisse",
    keywords: "Schlüsselwörter",
    sourcesConsulted: "Verwendete Quellen",
    relatedArticles: "Verwandte Artikel",
    language: "Sprache",
    notFoundTitle: "Artikel nicht gefunden",
    notFoundBody: "Dieser Artikel existiert nicht oder wurde entfernt.",
    viewAllArticles: "Alle Artikel ansehen",
    legalMentions: "Rechtlicher Hinweis",
    cabinetSubtitle: "Anwaltskanzlei",
    cabinetTitle: "VMDL - Anwaltskanzlei",
    notTranslatedNotice:
      "Dieser Artikel ist noch nicht in Ihrer Sprache verfügbar. Französische Version standardmäßig angezeigt.",
  },
  中文: {
    cabinet: "律所",
    expertises: "专业领域",
    vision: "愿景",
    fondateur: "创始人",
    honoraires: "费用",
    contact: "联系",
    articles: "文章",
    publications: "出版物",
    articlesPublications: "文章与出版物",
    introList:
      "由Vincent Machado da Luz律师和VMDL律所撰写的分析、见解和法律资讯。",
    emptyTitle: "即将发布",
    emptyBody: "律所的首批出版物即将在此发布。",
    minRead: "分钟阅读",
    readArticle: "阅读文章",
    backToAll: "← 所有文章",
    backToSite: "← 返回网站",
    keyTakeaways: "重点摘要",
    keywords: "关键词",
    sourcesConsulted: "引用来源",
    relatedArticles: "相关文章",
    language: "语言",
    notFoundTitle: "文章未找到",
    notFoundBody: "该文章不存在或已被移除。",
    viewAllArticles: "查看所有文章",
    legalMentions: "法律声明",
    cabinetSubtitle: "律师事务所",
    cabinetTitle: "VMDL - 律师事务所",
    notTranslatedNotice: "此文章尚未提供您选择的语言版本，默认显示法语版本。",
  },
};

export function getLabels(lang: LangueCode): I18nLabels {
  return LABELS[lang] || FALLBACK_FR;
}

export function isRTL(lang: LangueCode): boolean {
  return lang === "عربي";
}
