import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContentJson {
  articles?: unknown[];
  articles_drafts?: unknown[];
  [k: string]: unknown;
}

function getAuthedUser(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice("Bearer ".length);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      sub?: string;
    };
    return decoded.sub || "ok";
  } catch {
    return null;
  }
}

async function loadCms(): Promise<{
  cms: ContentJson;
  cmsResp: Awaited<ReturnType<Octokit["repos"]["getContent"]>>;
  curResp: Awaited<ReturnType<Octokit["repos"]["getContent"]>>;
  octokit: Octokit;
}> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;
  const currentRepo = process.env.GITHUB_CURRENT_REPO as string;
  const currentPath = process.env.GITHUB_CONTENT_CURRENT_PATH as string;

  const cmsResp = await octokit.repos.getContent({
    owner,
    repo: cmsRepo,
    path: cmsPath,
  });
  if (Array.isArray(cmsResp.data) || cmsResp.data.type !== "file") {
    throw new Error("CMS file not found");
  }
  const cms = JSON.parse(
    Buffer.from(cmsResp.data.content, "base64").toString()
  ) as ContentJson;

  const curResp = await octokit.repos.getContent({
    owner,
    repo: currentRepo,
    path: currentPath,
  });

  return { cms, cmsResp, curResp, octokit };
}

async function commitCms(
  cms: ContentJson,
  message: string
): Promise<void> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_USERNAME as string;
  const cmsRepo = process.env.GITHUB_CMS_REPO as string;
  const cmsPath = process.env.GITHUB_CONTENT_CMS_PATH as string;
  const currentRepo = process.env.GITHUB_CURRENT_REPO as string;
  const currentPath = process.env.GITHUB_CONTENT_CURRENT_PATH as string;

  const encoded = Buffer.from(JSON.stringify(cms, null, 2)).toString("base64");

  const cmsResp = await octokit.repos.getContent({
    owner,
    repo: cmsRepo,
    path: cmsPath,
  });
  if (!Array.isArray(cmsResp.data) && cmsResp.data.type === "file") {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: cmsRepo,
      path: cmsPath,
      message,
      content: encoded,
      sha: cmsResp.data.sha,
    });
  }

  const curResp = await octokit.repos.getContent({
    owner,
    repo: currentRepo,
    path: currentPath,
  });
  if (!Array.isArray(curResp.data) && curResp.data.type === "file") {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: currentRepo,
      path: currentPath,
      message,
      content: encoded,
      sha: curResp.data.sha,
    });
  }
}

export async function GET(req: Request) {
  if (!getAuthedUser(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { cms } = await loadCms();
    return NextResponse.json({
      ok: true,
      drafts: Array.isArray(cms.articles_drafts) ? cms.articles_drafts : [],
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!getAuthedUser(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as {
      action: "publish" | "delete" | "update";
      slug: string;
      patch?: Record<string, unknown>;
    };

    if (!body.slug || !body.action) {
      return NextResponse.json(
        { ok: false, error: "Missing slug/action" },
        { status: 400 }
      );
    }

    const { cms } = await loadCms();
    const drafts = Array.isArray(cms.articles_drafts)
      ? [...cms.articles_drafts]
      : [];
    const articles = Array.isArray(cms.articles) ? [...cms.articles] : [];
    const idx = drafts.findIndex(
      (d) => (d as { slug?: string }).slug === body.slug
    );
    if (idx === -1) {
      return NextResponse.json(
        { ok: false, error: "Draft not found" },
        { status: 404 }
      );
    }

    if (body.action === "delete") {
      drafts.splice(idx, 1);
      cms.articles_drafts = drafts;
      await commitCms(cms, `chore(cms): suppression du brouillon « ${body.slug} »`);
      return NextResponse.json({ ok: true });
    }

    if (body.action === "update") {
      drafts[idx] = { ...(drafts[idx] as object), ...(body.patch || {}) };
      cms.articles_drafts = drafts;
      await commitCms(cms, `chore(cms): édition du brouillon « ${body.slug} »`);
      return NextResponse.json({ ok: true });
    }

    if (body.action === "publish") {
      const draft = drafts[idx] as Record<string, unknown>;
      // Strip draft-only metadata when publishing.
      const { draftCreatedAt, draftSource, ...publishable } = draft;
      void draftCreatedAt;
      void draftSource;
      drafts.splice(idx, 1);
      articles.push(publishable);
      cms.articles_drafts = drafts;
      cms.articles = articles;
      await commitCms(
        cms,
        `feat(articles): publication de « ${(publishable as { title?: string }).title || body.slug} »`
      );
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("[/api/drafts] failed:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
