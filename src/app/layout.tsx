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
      "REST API Development",
      "AI Chatbot Development",
      "CRM Development",
      "Server Deployment",
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
    nationality: {
      "@type": "Country",
      name: "India",
    },
    gender: "Male",
    ...(process.env.NEXT_PUBLIC_CONTACT_EMAIL
      ? { email: process.env.NEXT_PUBLIC_CONTACT_EMAIL }
      : {}),
    worksFor: {
      "@type": "Organization",
      name: "Bitmax Technology Pvt. Ltd.",
      url: "https://bitmaxtech.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "QSpiders",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "NOIDA",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    // AEO: potentialAction — enables "hire" and "contact" actions in AI results
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "View Resume",
        target: `${siteConfig.url}/resume`,
      },
      {
        "@type": "ViewAction",
        name: "View Projects",
        target: `${siteConfig.url}/projects`,
      },
      {
        "@type": "CommunicateAction",
        name: "Contact Shivam Gaur",
        target: `mailto:ishivamgaur@gmail.com`,
      },
    ],
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

  // AEO: FAQPage schema — AI assistants (ChatGPT, Google AI, Perplexity) pull these directly
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Shivam Gaur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shivam Gaur (also known as @ishivamgaur) is a Full Stack Developer from NOIDA, India. He specializes in React, Next.js, Node.js, and MongoDB, and has professional experience building AI chatbots, CRM platforms, School ERP systems, and e-commerce applications. He currently works at Bitmax Technology Pvt. Ltd.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Shivam Gaur work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shivam works primarily with the MERN stack: MongoDB, Express.js, React, and Node.js. He also uses Next.js, TypeScript, Tailwind CSS, Redux Toolkit, AWS (EC2), Nginx, Framer Motion, and Shadcn UI. He has experience deploying production applications on VPS environments with Nginx reverse proxies.",
        },
      },
      {
        "@type": "Question",
        name: "Where does Shivam Gaur currently work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shivam currently works as a Full Stack Developer at Bitmax Technology Pvt. Ltd. in Greater Noida, India. He builds AI chatbots using the Groq API and develops CRM platforms with Role-Based Access Control (RBAC).",
        },
      },
      {
        "@type": "Question",
        name: "How can I hire or contact Shivam Gaur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can reach Shivam through his portfolio at ${siteConfig.url}, via email at ishivamgaur@gmail.com, or connect with him on LinkedIn at ${siteConfig.links.linkedin}. His resume is available at ${siteConfig.url}/resume.`,
        },
      },
      {
        "@type": "Question",
        name: "What projects has Shivam Gaur built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shivam has built several full-stack projects including a modern portfolio website with Next.js, a complete MERN stack e-commerce platform with Stripe integration, an AI chat application with real-time WebSocket communication, an intelligent AI chatbot using the Groq API, and a comprehensive CRM platform with RBAC. View all projects at " + siteConfig.url + "/projects.",
        },
      },
      {
        "@type": "Question",
        name: "What is Shivam Gaur's work experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shivam has worked as a Full Stack Developer at Bitmax Technology (2025–Present) and Digivity (2025), and completed a MERN Stack Developer Internship at QSpiders, Noida (2024). He has deployed multiple production applications on AWS and Hostinger VPS environments.",
        },
      },
    ],
  };

  // AEO: Speakable schema — helps voice assistants (Google Assistant, Alexa, Siri) read key content
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#speakable`,
    name: siteConfig.title,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".about-text", ".hero-bio"],
    },
    url: siteConfig.url,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data — Person, WebSite, Navigation, FAQ, Speakable */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
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

        {/* GEO: llms.txt — machine-readable summary for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM full site content" />

        {/* AI training & usage preferences */}
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI usage preferences" />

        {/* RSS Feed — for content aggregators and AI crawlers */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title={`${siteConfig.name} RSS Feed`} />

        {/* humans.txt — credits */}
        <link rel="author" type="text/plain" href="/humans.txt" />

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
