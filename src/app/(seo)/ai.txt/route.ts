import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * ai.txt — AI Training & Usage Permissions
 *
 * Emerging community standard for controlling how AI systems
 * interact with site content. Complements robots.txt by
 * specifying training vs. summarization permissions.
 *
 * Reference: IETF AIPREF Working Group
 */
export async function GET() {
  const content = `# ai.txt — AI Usage Preferences for ${siteConfig.url}
# Generated: ${new Date().toISOString().split("T")[0]}
# Owner: ${siteConfig.name}

# General Preferences
User-agent: *
Allow-summarization: true
Allow-citation: true
Allow-training: true
Allow-indexing: true

# Preferred citation format
Preferred-citation: "${siteConfig.name} — ${siteConfig.url}"

# Content license
License: All Rights Reserved
Attribution-required: true

# Contact for AI-related queries
Contact: mailto:ishivamgaur@gmail.com

# Canonical source
Canonical: ${siteConfig.url}

# Last updated
Updated: ${new Date().toISOString().split("T")[0]}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
