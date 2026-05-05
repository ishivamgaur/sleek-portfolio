export const siteConfig = {
  name: "Shivam Gaur",
  title: "Shivam Gaur | Software Developer",
  description:
    "Portfolio of Shivam Gaur, Software Developer based in NOIDA. Explore my projects, experience, and resume.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://shivamgaur.space",
  ogImage: "https://shivamgaur.space/profile-pic.jpg", // Using profile pic as fallback OG image
  links: {
    twitter: "https://twitter.com/ishivamgaur",
    github: "https://github.com/ishivamgaur",
    linkedin: "https://linkedin.com/in/ishivamgaur",
    instagram: "https://instagram.com/ishivamgaur",
  },
  keywords: [
    "Shivam Gaur",
    "Shivam Gaur Resume",
    "Software Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "NOIDA",
    "India",
  ],
  author: "Shivam Gaur",
  creator: "Shivam Gaur",
};

export type SiteConfig = typeof siteConfig;
