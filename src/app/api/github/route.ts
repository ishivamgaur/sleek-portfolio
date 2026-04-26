import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "ishivamgaur";
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      { headers, next: { revalidate: 3600 } }, // Cache on server for 1 hour
    );
    const userData = await userResponse.json();

    // Fetch repositories to calculate total stars
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers, next: { revalidate: 3600 } }, // Cache on server for 1 hour
    );
    const reposData = await reposResponse.json();

    let stars = 0;
    if (Array.isArray(reposData)) {
      reposData.forEach((repo: any) => {
        stars += repo.stargazers_count;
      });
    }

    return NextResponse.json({
      followers: userData.followers,
      publicRepos: userData.public_repos,
      stars: stars,
      profileUrl: userData.html_url,
      createdAt: userData.created_at,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 },
    );
  }
}
