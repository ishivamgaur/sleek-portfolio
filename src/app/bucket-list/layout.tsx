import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "100 List",
  description: `The 100 List - A bucket list of things ${siteConfig.name} wants to do, learn, and achieve in a lifetime.`,
  keywords: [
    "100 List",
    "Bucket List",
    "Life Goals",
    "Shivam Gaur Goals",
    "Personal Development",
  ],
  alternates: {
    canonical: `${siteConfig.url}/bucket-list`,
  },
  openGraph: {
    title: "100 List",
    description: `A curated bucket list of things ${siteConfig.name} wants to accomplish.`,
    url: `${siteConfig.url}/bucket-list`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100 List",
    description: `A curated bucket list of things ${siteConfig.name} wants to accomplish.`,
  },
};

export default function BucketListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shivam Gaur's 100 List",
    description: "A personal bucket list of goals and achievements.",
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
