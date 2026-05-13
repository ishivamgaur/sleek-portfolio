import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * humans.txt — Who made this site?
 *
 * A web standard for crediting the people behind a website.
 * Reference: https://humanstxt.org
 */
export async function GET() {
  const content = `/* TEAM */
Name: ${siteConfig.name}
Role: Full Stack Developer, Designer, Creator
Location: NOIDA, Uttar Pradesh, India
Contact: ishivamgaur@gmail.com
GitHub: ${siteConfig.links.github}
LinkedIn: ${siteConfig.links.linkedin}
Twitter: ${siteConfig.links.twitter}
Instagram: ${siteConfig.links.instagram}

/* SITE */
Last update: ${new Date().toISOString().split("T")[0]}
Language: English
Doctype: HTML5
Framework: Next.js 16
UI: React, Tailwind CSS, Shadcn UI
Animation: Framer Motion
Hosting: Vercel
Analytics: Umami
Fonts: Hanken Grotesk (Google Fonts)

/* THANKS */
Next.js — https://nextjs.org
Tailwind CSS — https://tailwindcss.com
Shadcn UI — https://ui.shadcn.com
Framer Motion — https://motion.dev
Lucide Icons — https://lucide.dev
Vercel — https://vercel.com
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
