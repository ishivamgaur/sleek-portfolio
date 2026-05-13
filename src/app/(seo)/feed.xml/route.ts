import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { portfolioData } from "@/data/portfolio";

/**
 * RSS 2.0 Feed — /feed.xml
 *
 * Enables content aggregators, AI crawlers, and feed readers
 * to discover and track content changes. Important for GEO
 * as AI engines use feeds to stay current on site content.
 */
export async function GET() {
  const projects = portfolioData.projects || [];
  const experiences = portfolioData.experiences || [];
  const now = new Date().toUTCString();

  const projectItems = projects
    .map(
      (project) => `
    <item>
      <title>${escapeXml(project.title)}</title>
      <description>${escapeXml(project.description)}</description>
      <link>${siteConfig.url}/projects/${project._id}</link>
      <guid isPermaLink="true">${siteConfig.url}/projects/${project._id}</guid>
      <category>Project</category>
      ${project.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ") || ""}
    </item>`,
    )
    .join("");

  const experienceItems = experiences
    .map(
      (exp) => `
    <item>
      <title>${escapeXml(exp.role)} at ${escapeXml(exp.company)}</title>
      <description>${escapeXml(exp.content?.split("\n")[0] || "")}</description>
      <link>${siteConfig.url}/experience</link>
      <guid isPermaLink="false">experience-${exp._id}</guid>
      <pubDate>${new Date(exp.startDate).toUTCString()}</pubDate>
      <category>Experience</category>
    </item>`,
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>${escapeXml(siteConfig.name)} — Portfolio</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>ishivamgaur@gmail.com (${siteConfig.name})</managingEditor>
    <webMaster>ishivamgaur@gmail.com (${siteConfig.name})</webMaster>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteConfig.ogImage}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${siteConfig.url}</link>
    </image>
    ${projectItems}
    ${experienceItems}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
