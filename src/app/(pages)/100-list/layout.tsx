import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { portfolioData } from "@/data/portfolio";

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
    images: [
      {
        url: siteConfig.ogImages.oneHundredList,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} 100 list`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "100 List",
    description: `A curated 100 list of things ${siteConfig.name} wants to accomplish.`,
    images: [siteConfig.ogImages.oneHundredList],
  },
};

export default function OneHundredListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // GEO: Complete ItemList schema with ALL items — AI engines can cite the full list
  const bucketList = portfolioData.bucketList || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/100-list/#webpage`,
    url: `${siteConfig.url}/100-list`,
    name: "Shivam Gaur's 100 List & Bucket List",
    description: `A personal list of ${bucketList.length} goals and life ambitions by ${siteConfig.name}.`,
    numberOfItems: bucketList.length,
    itemListElement: bucketList.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      ...(item.completed ? { description: "Completed ✓" } : {}),
    })),
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
        item: `${siteConfig.url}/100-list`,
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
