import { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = portfolioData.projects.find((p) => p._id === params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
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

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
