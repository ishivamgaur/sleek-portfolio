import { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p._id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
    alternates: {
      canonical: `${siteConfig.url}/projects/${project._id}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${siteConfig.url}/projects/${project._id}`,
      images: [
        {
          url: project.thumbnailUrl || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.thumbnailUrl || siteConfig.ogImage],
    },
  };
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p._id === id);

  if (!project) {
    return <>{children}</>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${siteConfig.url}/projects/${project._id}/#software`,
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project._id}`,
    image: project.thumbnailUrl || siteConfig.ogImage,
    codeRepository: project.link,
    programmingLanguage: project.tags,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
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
