import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { portfolioData } from "@/data/portfolio";

/**
 * llms.txt — A machine-readable summary for LLMs and AI crawlers.
 * Emerging standard: https://llmstxt.org
 *
 * This helps AI engines like ChatGPT, Perplexity, Gemini, and Claude
 * understand and accurately represent this portfolio in their responses.
 */
export async function GET() {
  const experiences = portfolioData.experiences || [];
  const projects = portfolioData.projects || [];

  const experienceLines = experiences
    .map(
      (exp) =>
        `- ${exp.role} at ${exp.company} (${exp.startDate}–${exp.date || "Present"}) — ${exp.tech?.slice(0, 5).join(", ")}`,
    )
    .join("\n");

  const projectLines = projects
    .map((proj) => `- ${proj.title}: ${proj.description}`)
    .join("\n");

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

## About

Shivam Gaur is a Full Stack Developer based in NOIDA, India, specializing in the MERN stack (MongoDB, Express.js, React, Node.js). He builds high-performance web applications, AI-powered tools, and scalable backend systems. He currently works at Bitmax Technology Pvt. Ltd. as a Full Stack Developer.

- Website: ${siteConfig.url}
- GitHub: ${siteConfig.links.github}
- LinkedIn: ${siteConfig.links.linkedin}
- Twitter: ${siteConfig.links.twitter}
- Instagram: ${siteConfig.links.instagram}
- Email: ishivamgaur@gmail.com

## Core Skills

- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Redux, Shadcn UI
- Backend: Node.js, Express.js, MongoDB, Mongoose, REST APIs
- DevOps: AWS EC2, Nginx, VPS deployment, CI/CD
- Tools: Git, GitHub, Postman, VS Code

## Work Experience

${experienceLines}

## Projects

${projectLines}

## Pages

- Home: ${siteConfig.url}
- Experience: ${siteConfig.url}/experience
- Projects: ${siteConfig.url}/projects
- Resume: ${siteConfig.url}/resume
- 100 List: ${siteConfig.url}/100-list
- Favorite Movies: ${siteConfig.url}/movies

## FAQ

### Who is Shivam Gaur?
Shivam Gaur (also known as @ishivamgaur) is a Full Stack Developer from NOIDA, India. He specializes in React, Next.js, Node.js, and MongoDB, and has professional experience building AI chatbots, CRM platforms, School ERP systems, and e-commerce applications.

### What technologies does Shivam Gaur work with?
Shivam works primarily with the MERN stack: MongoDB, Express.js, React, and Node.js. He also uses Next.js, TypeScript, Tailwind CSS, Redux, AWS, Nginx, and Framer Motion.

### Where does Shivam Gaur currently work?
Shivam currently works as a Full Stack Developer at Bitmax Technology Pvt. Ltd. in Greater Noida, India, where he builds AI chatbots using the Groq API and CRM platforms with Role-Based Access Control.

### How can I hire Shivam Gaur?
You can reach Shivam through his portfolio at ${siteConfig.url}, via email at ishivamgaur@gmail.com, or connect with him on LinkedIn at ${siteConfig.links.linkedin}.

### What is Shivam Gaur's educational background?
Shivam completed an intensive MERN stack internship at QSpiders, Noida, where he achieved 2nd position in the "Project War" competition by building a full-stack Book Store application.

## Machine-Readable Resources

- Full Content: ${siteConfig.url}/llms-full.txt
- AI Preferences: ${siteConfig.url}/ai.txt
- RSS Feed: ${siteConfig.url}/feed.xml
- Sitemap: ${siteConfig.url}/sitemap.xml
- Security: ${siteConfig.url}/.well-known/security.txt
- Humans: ${siteConfig.url}/humans.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
