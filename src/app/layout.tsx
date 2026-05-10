import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnalyticsTracker from "@/components/widgets/AnalyticsTracker";
import Quotes from "@/components/sections/Quotes";
import { siteConfig } from "@/config/site";

const font = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ishivamgaur",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: [
      "ishivamgaur",
      "Shivam Gaur",
      "shivamgaur",
      "shivam developer",
      "shivam gaur developer",
    ],
    url: siteConfig.url,
    image: siteConfig.ogImage,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
    ],
    jobTitle: [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "MERN Stack Developer",
      "Software Engineer",
      "Software Developer",
      "Web Developer",
    ],
    description: siteConfig.description,
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
      "Express.js",
      "Tailwind CSS",
      "Redux",
      "AWS",
      "MERN Stack",
      "Full Stack Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      skills:
        "React, Next.js, Node.js, MongoDB, TypeScript, JavaScript, Express.js, Tailwind CSS, Redux, AWS",
      occupationLocation: {
        "@type": "City",
        name: "Noida, India",
      },
    },
    knowsLanguage: ["en", "hi"],
    ...(process.env.NEXT_PUBLIC_CONTACT_EMAIL
      ? { email: process.env.NEXT_PUBLIC_CONTACT_EMAIL }
      : {}),
    worksFor: {
      "@type": "Organization",
      name: "Bitmax Technology Pvt. Ltd.",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "NOIDA",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  };

  const mainNavigation = [
    { name: "Home", url: siteConfig.url },
    { name: "Projects", url: `${siteConfig.url}/projects` },
    { name: "Experience", url: `${siteConfig.url}/experience` },
    { name: "Resume", url: `${siteConfig.url}/resume` },
    { name: "100 List", url: `${siteConfig.url}/100-list` },
    { name: "Favorite Movies", url: `${siteConfig.url}/movies` },
  ];

  // WebSite schema — helps search engines understand the site identity.
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: `${siteConfig.name} — Portfolio`,
    alternateName: [
      "ishivamgaur portfolio",
      "shivam gaur portfolio",
      "shivam developer portfolio",
      "ishivamgaur.space",
    ],
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#person` },
    inLanguage: "en-US",
  };

  const navigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${siteConfig.url}/#site-navigation`,
    name: mainNavigation.map((item) => item.name),
    url: mainNavigation.map((item) => item.url),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data — Person, WebSite, Navigation, Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
        />

        {/* Bing Webmaster Tools verification (covers Edge, DuckDuckGo) */}
        {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
          <meta
            name="msvalidate.01"
            content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}
          />
        )}

        {/* Yandex Webmaster verification */}
        {process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION && (
          <meta
            name="yandex-verification"
            content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION}
          />
        )}

        {/* Google Search Console verification */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Umami Analytics */}
        {process.env.NEXT_PUBLIC_UMAMI_URL &&
          process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <Script
              defer
              src={process.env.NEXT_PUBLIC_UMAMI_URL}
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            />
          )}
      </head>
      <body
        className={`${font.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <AnalyticsTracker />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="max-w-3xl mx-auto w-full flex-grow flex flex-col pb-8">
              {children}
              <div className="px-4 mt-8">
                <Quotes />
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
