import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * security.txt — RFC 9116 Standard
 *
 * Professional security contact file served at /.well-known/security.txt
 * Shows professionalism and security awareness.
 */
export async function GET() {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const content = `# Security Policy for ${siteConfig.url}
# RFC 9116 — https://www.rfc-editor.org/rfc/rfc9116

Contact: mailto:ishivamgaur@gmail.com
Contact: ${siteConfig.links.linkedin}
Contact: ${siteConfig.links.instagram}
Expires: ${expiryDate.toISOString()}
Preferred-Languages: en, hi
Canonical: ${siteConfig.url}/.well-known/security.txt
Policy: ${siteConfig.url}
Hiring: ${siteConfig.url}/resume
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
