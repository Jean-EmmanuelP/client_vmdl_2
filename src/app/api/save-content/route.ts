import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";
import { FileInfoResponseData } from "@/app/utils/interface";

export async function POST(req: Request) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const dataSended = await req.json();
    const fileInfoResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GITHUB_USERNAME as string,
        repo: process.env.GITHUB_CMS_REPO as string,
        path: process.env.GITHUB_CONTENT_CMS_PATH as string,
      }
    );

    const fileInfoResponseContent = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GITHUB_USERNAME as string,
        repo: process.env.GITHUB_CURRENT_REPO as string,
        path: process.env.GITHUB_CONTENT_CURRENT_PATH as string,
      }
    );

    let sha, shaContent;
    const dataContent = fileInfoResponseContent.data as FileInfoResponseData;
    const data = fileInfoResponse.data as FileInfoResponseData;

    if ("sha" in data && data.sha) {
      sha = data.sha;
      shaContent = dataContent.sha;
    } else {
      sha = "null";
      shaContent = "null";
    }

    const prettyContent = JSON.stringify(dataSended, null, 2);
    const encodedContent = Buffer.from(prettyContent).toString("base64");

    await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: process.env.GITHUB_USERNAME as string,
        repo: process.env.GITHUB_CMS_REPO as string,
        path: process.env.GITHUB_CONTENT_CMS_PATH as string,
        message: "with prettier content.json v1",
        content: encodedContent,
        sha,
      }
    );

    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: process.env.GITHUB_USERNAME as string,
      repo: process.env.GITHUB_CURRENT_REPO as string,
      path: process.env.GITHUB_CONTENT_CURRENT_PATH as string,
      message: "Mise à jour du fichier content.json",
      content: encodedContent,
      sha: dataContent.sha,
    });
    return NextResponse.json({ message: "Content updated successfully." });
  } catch (error) {
    throw new Error("Failed to update content.");
  }
}
