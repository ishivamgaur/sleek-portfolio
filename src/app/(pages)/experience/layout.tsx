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
    images: [
      {
        url: siteConfig.ogImages.experience,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} experience`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience",
    description: `Work Experience and work history of ${siteConfig.name}.`,
    images: [siteConfig.ogImages.experience],
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
    "@id": `${siteConfig.url}/experience/#webpage`,
    url: `${siteConfig.url}/experience`,
    name: "Shivam Gaur Work Experience",
    description: `Detailed work history and career progression of ${siteConfig.name}.`,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Shivam Gaur",
      jobTitle: "Full Stack Developer",
      url: siteConfig.url,
      // AEO: Complete work history with dates — AI engines use this for timeline queries
      worksFor: [
        {
          "@type": "Organization",
          name: "Bitmax Technology Pvt. Ltd.",
          address: "Greater Noida, Sector 90",
        },
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Professional Experience",
          name: "Full Stack Developer at Bitmax Technology",
          description:
            "Developed AI chatbots using Groq API, built CRM platforms with RBAC, deployed applications on AWS EC2 with Nginx reverse proxies.",
          dateCreated: "2025-09-01",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Professional Experience",
          name: "Full Stack Developer at Digivity",
          description:
            "Built School ERP system using MERN stack, developed ETAB ERP marketing website with Next.js, optimized frontend performance with lazy loading and code splitting.",
          dateCreated: "2025-05-01",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Internship",
          name: "MERN Stack Developer Intern at QSpiders",
          description:
            "Completed intensive MERN stack training. Achieved 2nd position in Project War competition by building a full-stack Book Store application.",
          dateCreated: "2024-06-01",
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
        item: `${siteConfig.url}/experience`,
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
