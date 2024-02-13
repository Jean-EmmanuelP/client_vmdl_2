import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

interface FileInfoResponseData {
  sha?: string;
}

export async function POST(req: Request) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const dataSended = await req.json();
    const fileInfoResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GITHUB_USERNAME as string,
        repo: process.env.GITHUB_REPO as string,
        path: process.env.GITHUB_CONTENT_PATH as string,
      }
    );
    let sha;
    const data = fileInfoResponse.data as FileInfoResponseData;

    if ("sha" in data && data.sha) {
      sha = data.sha;
    } else {
      sha = "null";
    }

    const prettyContent = JSON.stringify(dataSended, null, 2);
    const encodedContent = Buffer.from(prettyContent).toString("base64");

    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GITHUB_USERNAME as string,
        repo: process.env.GITHUB_REPO as string,
        path: process.env.GITHUB_CONTENT_PATH as string,
        message: "with prettier content.json",
        content: encodedContent,
        sha,
      }
    );
    return NextResponse.json({ message: "Content updated successfully." });
  } catch (error) {
    throw new Error("Failed to update content.");
  }
}
