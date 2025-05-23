import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from 'next/server';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function GET(req: NextRequest) {
  try {
    const commits = await octokit.repos.listCommits({
      owner: process.env.GITHUB_USERNAME as string,
      repo: process.env.GITHUB_CMS_REPO as string,
      sha: 'master',
      per_page: 1,
    });

    if (commits.data.length === 0) {
      throw new Error("No commits found on the specified branch");
    }
    
    const lastCommitSha = commits.data[0].sha;

    
    const response = await octokit.repos.getContent({
      owner: process.env.GITHUB_USERNAME as string,
      repo: process.env.GITHUB_CMS_REPO as string,
      path: process.env.GITHUB_CONTENT_CMS_PATH as string,
      ref: lastCommitSha,
    });

    if ("content" in response.data && response.data.type === "file") {
      const content = Buffer.from(response.data.content, "base64").toString();
      return NextResponse.json(JSON.parse(content));
    } else {
      throw new Error("Could not retrieve content.json");
    }
  } catch (error) {
    console.error("Error fetching content.json:", error);
    throw error;
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0