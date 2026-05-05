import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience | Shivam Gaur",
  description: `Detailed professional experience and work history of ${siteConfig.name}, showcasing skills and roles in software development.`,
  keywords: [
    "Shivam Gaur Experience",
    "Software Developer Work History",
    "Shivam Gaur NOIDA",
    "Frontend Engineer Experience",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
  openGraph: {
    title: "Experience | Shivam Gaur",
    description: `Professional experience and work history of ${siteConfig.name}.`,
    url: `${siteConfig.url}/experience`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Shivam Gaur",
    description: `Professional experience and work history of ${siteConfig.name}.`,
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Shivam Gaur",
      jobTitle: "Software Developer",
      url: siteConfig.url,
    },
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {children}
    </>
  );
}
