import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { portfolioData } from "@/data/portfolio";

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
    images: [
      {
        url: siteConfig.ogImages.movies,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} favorite movies`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favorite Movies",
    description: `A curated list of ${siteConfig.name}'s favorite movies.`,
    images: [siteConfig.ogImages.movies],
  },
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // GEO: Complete ItemList schema with ALL movies — AI engines can cite the full list
  const movies = portfolioData.favoriteMovies || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/movies/#webpage`,
    url: `${siteConfig.url}/movies`,
    name: "Shivam Gaur's Favorite Movies",
    description: `A curated list of ${movies.length} favorite movies by ${siteConfig.name}.`,
    numberOfItems: movies.length,
    itemListElement: movies.map((movie, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: movie.title,
      item: {
        "@type": "Movie",
        name: movie.title,
        director: {
          "@type": "Person",
          name: movie.director,
        },
        datePublished: movie.year,
      },
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
        name: "Favorite Movies",
        item: `${siteConfig.url}/movies`,
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
