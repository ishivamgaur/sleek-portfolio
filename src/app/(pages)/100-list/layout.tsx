import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "100 List",
  description: `The 100 List - Things ${siteConfig.name} wants to do, learn, and achieve in a lifetime.`,
  keywords: [
    "100 List",
    "Bucket List",
    "Life Goals",
    "ishivamgaur bucket list",
    "ishivamgaur goals",
    "Shivam Gaur Goals",
    "Shivam Gaur Bucket List",
    "Personal Development",
    "100 things to do",
    "developer life goals",
    "personal growth list",
  ],
  alternates: {
    canonical: `${siteConfig.url}/100-list`,
  },
  openGraph: {
    title: "100 List",
    description: `A curated 100 list of things ${siteConfig.name} wants to accomplish.`,
    url: `${siteConfig.url}/100-list`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100 List",
    description: `A curated 100 list of things ${siteConfig.name} wants to accomplish.`,
  },
};

export default function OneHundredListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/100-list/#webpage`,
    url: `${siteConfig.url}/100-list`,
    name: "Shivam Gaur's 100 List & Bucket List",
    description: "A personal 100 list of goals and achievements.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Build a tech startup",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel to Japan",
      },
    ],
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
        name: "100 List",
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
