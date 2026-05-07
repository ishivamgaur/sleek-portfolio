import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore the software development projects, open-source contributions, and technical experiments built by ${siteConfig.name}.`,
  keywords: [
    "Shivam Gaur Projects",
    "Software Projects",
    "React Projects",
    "Next.js Portfolio",
    "MERN Stack Projects",
    "Web Development",
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
  return <>{children}</>;
}
