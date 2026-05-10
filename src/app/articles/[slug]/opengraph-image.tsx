import { ImageResponse } from "next/og";
import { getArticleBySlug, getAllArticles, formatDate } from "../../utils/articles";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #030303 0%, #1a1a1a 100%)",
          color: "#F9F9F9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#F9F9F9",
              fontWeight: 300,
            }}
          >
            VMDL
          </div>
          <div
            style={{
              height: 1,
              flex: 1,
              background: "rgba(249,249,249,0.2)",
            }}
          />
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(249,249,249,0.5)",
            }}
          >
            Article
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(249,249,249,0.55)",
            }}
          >
            {article?.publishedAt ? formatDate(article.publishedAt) : ""}
            {article?.tags && article.tags.length > 0
              ? `   ·   ${article.tags.slice(0, 2).join(" · ")}`
              : ""}
          </div>
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.1,
              fontWeight: 300,
              maxWidth: 1000,
              color: "#F9F9F9",
              textTransform: "uppercase",
              letterSpacing: -0.5,
            }}
          >
            {article?.title || "Article VMDL"}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 18,
              color: "rgba(249,249,249,0.7)",
              fontWeight: 300,
            }}
          >
            Maître Vincent Machado da Luz · Avocat à la Cour
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(249,249,249,0.5)",
            }}
          >
            vmdl.ai
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
