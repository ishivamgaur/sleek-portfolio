import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "100 List",
  description: `The 100 List - A bucket list of things ${siteConfig.name} wants to do, learn, and achieve in a lifetime.`,
  keywords: ["100 List", "Bucket List", "Life Goals", "Shivam Gaur Goals"],
};

export default function BucketListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
