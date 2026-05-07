import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Detailed Work Experience and work history of ${siteConfig.name}, showcasing skills and roles in software development.`,
  keywords: [
    "Shivam Gaur Experience",
    "Shivam Gaur Work History",
    "Full Stack Developer Experience",
    "MERN Stack Developer",
    "Software Developer NOIDA",
    "Bitmax Technology",
    "Digivity",
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
