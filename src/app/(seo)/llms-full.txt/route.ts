import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { portfolioData } from "@/data/portfolio";

/**
 * llms-full.txt — Extended LLM context file
 *
 * While /llms.txt provides a concise summary, /llms-full.txt gives
 * AI engines the complete, detailed content of the portfolio for
 * maximum accuracy in AI-generated responses.
 *
 * Reference: https://llmstxt.org (llms-full.txt extension)
 */
export async function GET() {
  const experiences = portfolioData.experiences || [];
  const projects = portfolioData.projects || [];
  const bucketList = portfolioData.bucketList || [];
  const movies = portfolioData.favoriteMovies || [];

  const experienceDetails = experiences
    .map((exp) => {
      const bullets = (exp.content || "")
        .split("\n")
        .filter(Boolean)
        .map((line) => `  - ${line.trim()}`)
        .join("\n");
      return `### ${exp.role} at ${exp.company}
- Period: ${exp.startDate} to ${exp.date || "Present"}
- Location: ${exp.location || "India"}
- Type: ${exp.type || "On-site"}
- Technologies: ${exp.tech?.join(", ") || "N/A"}
- Responsibilities:
${bullets}`;
    })
    .join("\n\n");

  const projectDetails = projects
    .map((proj) => {
      const features = (proj.features || [])
        .map((f) => `  - ${f}`)
        .join("\n");
      return `### ${proj.title}
- Description: ${proj.description}
- Technologies: ${proj.tags?.join(", ") || "N/A"}
${proj.link ? `- Live URL: ${proj.link}` : ""}
${proj.github ? `- Source Code: ${proj.github}` : ""}
${proj.content ? `- Details: ${proj.content}` : ""}
${features ? `- Key Features:\n${features}` : ""}`;
    })
    .join("\n\n");

  const bucketListItems = bucketList
    .map(
      (item) =>
        `  ${item.completed ? "✅" : "⬜"} ${item.title}`,
    )
    .join("\n");

  const movieList = movies
    .map(
      (movie) =>
        `  - ${movie.title} (${movie.year}) — Dir. ${movie.director}`,
    )
    .join("\n");

  const content = `# ${siteConfig.name} — Complete Portfolio Content

> This is the full, detailed version of the portfolio content for ${siteConfig.name}. For a concise summary, see /llms.txt.

## Identity

- Full Name: Shivam Gaur
- Known As: @ishivamgaur
- Current Role: Full Stack Developer at Bitmax Technology Pvt. Ltd.
- Location: NOIDA, Uttar Pradesh, India
- Nationality: Indian
- Languages: English, Hindi
- Website: ${siteConfig.url}
- Email: ishivamgaur@gmail.com
- GitHub: ${siteConfig.links.github}
- LinkedIn: ${siteConfig.links.linkedin}
- Twitter: ${siteConfig.links.twitter}
- Instagram: ${siteConfig.links.instagram}

## Professional Summary

Shivam Gaur is a Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). He builds high-performance web applications, AI-powered tools, and scalable backend systems. He has professional experience developing AI chatbots using the Groq API, CRM platforms with Role-Based Access Control (RBAC), School ERP systems, and e-commerce platforms. He is proficient in deploying production applications on AWS EC2 and Hostinger VPS environments with Nginx reverse proxies.

## Technical Skills

### Frontend
- React.js, Next.js (App Router & Pages Router)
- TypeScript, JavaScript (ES6+)
- Tailwind CSS, Shadcn UI, Aceternity UI
- Framer Motion (animations)
- Redux Toolkit (state management)
- HTML5, CSS3

### Backend
- Node.js, Express.js
- MongoDB, Mongoose ODM
- RESTful API Design
- Authentication & Authorization (JWT, RBAC)

### DevOps & Tooling
- AWS EC2, Hostinger VPS
- Nginx (reverse proxy)
- Git, GitHub
- Postman (API testing)
- VS Code

## Work Experience (Detailed)

${experienceDetails}

## Projects (Detailed)

${projectDetails}

## 100 List — Life Goals

${bucketListItems}

## Favorite Movies

${movieList}

## Site Pages

| Page | URL | Description |
|---|---|---|
| Home | ${siteConfig.url} | Portfolio homepage with bio, projects, and experience overview |
| Experience | ${siteConfig.url}/experience | Detailed work history and career progression |
| Projects | ${siteConfig.url}/projects | Software projects and open-source contributions |
| Resume | ${siteConfig.url}/resume | Downloadable professional resume / CV |
| 100 List | ${siteConfig.url}/100-list | Personal bucket list of life goals |
| Favorite Movies | ${siteConfig.url}/movies | Curated list of inspiring films |

## Machine-Readable Resources

- Sitemap: ${siteConfig.url}/sitemap.xml
- RSS Feed: ${siteConfig.url}/feed.xml
- Robots: ${siteConfig.url}/robots.txt
- AI Preferences: ${siteConfig.url}/ai.txt
- LLM Summary: ${siteConfig.url}/llms.txt
- LLM Full Content: ${siteConfig.url}/llms-full.txt
- Security: ${siteConfig.url}/.well-known/security.txt
- Humans: ${siteConfig.url}/humans.txt

---
Last updated: ${new Date().toISOString().split("T")[0]}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
