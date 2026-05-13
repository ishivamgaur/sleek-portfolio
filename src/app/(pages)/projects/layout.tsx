import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore the software development projects, open-source contributions, and technical experiments built by ${siteConfig.name}.`,
  keywords: [
    "Shivam Gaur Projects",
    "ishivamgaur projects",
    "ishivamgaur github",
    "Shivam Gaur GitHub",
    "Shivam Gaur Open Source",
    "Software Projects",
    "React Projects",
    "Next.js Portfolio",
    "MERN Stack Projects",
    "Full Stack Projects",
    "Web Development Projects",
    "Node.js Projects",
    "developer side projects",
    "open source contributions India",
    "software developer portfolio projects",
  ],
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: "Projects",
    description: `Software development projects and open-source work by ${siteConfig.name}.`,
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImages.projects,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} projects`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description: `Software development projects by ${siteConfig.name}.`,
    images: [siteConfig.ogImages.projects],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // GEO: CollectionPage + complete project list with SoftwareApplication types
  const projects = portfolioData.projects || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/projects/#webpage`,
    url: `${siteConfig.url}/projects`,
    name: "Shivam Gaur Software Projects & Portfolio",
    description: `Explore the software development projects, open-source contributions, and technical experiments built by ${siteConfig.name}.`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
    },
    // AEO: ItemList with SoftwareApplication entities — AI engines can cite specific projects
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
          author: {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
          },
          ...(project.link ? { url: project.link } : {}),
          ...(project.github
            ? { codeRepository: project.github }
            : {}),
          ...(project.tags
            ? { keywords: project.tags.join(", ") }
            : {}),
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/projects`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
