import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Detailed Work Experience and work history of ${siteConfig.name}, showcasing skills and roles in software development.`,
  keywords: [
    "Shivam Gaur Experience",
    "ishivamgaur experience",
    "ishivamgaur work history",
    "Shivam Gaur Work History",
    "Shivam Gaur Work Experience",
    "Shivam Gaur Career",
    "Full Stack Developer Experience",
    "Software Developer Experience",
    "MERN Stack Developer Experience",
    "React Developer Experience",
    "Software Developer NOIDA",
    "Bitmax Technology",
    "Digivity",
    "QSpiders MERN Stack",
    "developer internship India",
    "full stack developer work history",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
  openGraph: {
    title: "Experience",
    description: `Work Experience and work history of ${siteConfig.name}.`,
    url: `${siteConfig.url}/experience`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience",
    description: `Work Experience and work history of ${siteConfig.name}.`,
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
      jobTitle: "Full Stack Developer",
      url: siteConfig.url,
      worksFor: [
        {
          "@type": "Organization",
          name: "Bitmax Technology Pvt. Ltd.",
          address: "Greater Noida, Section 90",
        },
        {
          "@type": "Organization",
          name: "Digivity",
          address: "Knowledge Park III, Greater Noida",
        },
      ],
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
        name: "Experience",
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
