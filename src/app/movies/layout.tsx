import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Favorite Movies",
  description: `A curated list of ${siteConfig.name}'s favorite movies that inspire and entertain.`,
  keywords: ["Favorite Movies", "Film Recommendations", "Top Movies", "Cinema"],
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
