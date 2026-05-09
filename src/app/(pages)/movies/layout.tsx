import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Favorite Movies",
  description: `A curated list of ${siteConfig.name}'s favorite movies that inspire and entertain.`,
  keywords: [
    "Favorite Movies",
    "Film Recommendations",
    "Top Movies",
    "Cinema",
    "ishivamgaur movies",
    "ishivamgaur favorite films",
    "Shivam Gaur Movies",
    "Shivam Gaur Favorite Films",
    "best movies list",
    "movie recommendations developer",
    "must watch movies",
  ],
  alternates: {
    canonical: `${siteConfig.url}/movies`,
  },
  openGraph: {
    title: "Favorite Movies",
    description: `A curated list of ${siteConfig.name}'s favorite movies.`,
    url: `${siteConfig.url}/movies`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favorite Movies",
    description: `A curated list of ${siteConfig.name}'s favorite movies.`,
  },
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/movies/#webpage`,
    url: `${siteConfig.url}/movies`,
    name: "Shivam Gaur's Favorite Movies",
    description: "A curated list of movies that inspire.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Interstellar",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "The Matrix",
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
        name: "Favorite Movies",
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
