import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description: `Software development projects by ${siteConfig.name}.`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/projects/#webpage`,
    url: `${siteConfig.url}/projects`,
    name: "Shivam Gaur Software Projects & Portfolio",
    description: `Explore the software development projects, open-source contributions, and technical experiments built by ${siteConfig.name}.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
