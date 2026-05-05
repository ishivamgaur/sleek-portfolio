import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Detailed professional experience and work history of ${siteConfig.name}, showcasing skills and roles in software development.`,
  keywords: [
    "Shivam Gaur Experience",
    "Software Developer Work History",
    "Shivam Gaur NOIDA",
  ],
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
