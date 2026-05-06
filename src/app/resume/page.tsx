import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import ResumeHeader from "@/components/portfolio/ResumeHeader";
import ResumeViewer from "@/components/portfolio/ResumeViewer";
import { siteConfig } from "@/config/site";

export const revalidate = 60; // Cache the page for 60 seconds to make navigations instant

export const metadata = {
  title: "Resume | Shivam Gaur",
  description: `View and download the professional resume of ${siteConfig.name}, Software Developer based in NOIDA.`,
  keywords: [
    "Shivam Gaur Resume",
    "Shivam Gaur CV",
    "Software Developer Resume",
    "Shivam Gaur NOIDA",
  ],
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: "Resume | Shivam Gaur",
    description: `View and download the professional resume of ${siteConfig.name}.`,
    url: `${siteConfig.url}/resume`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Shivam Gaur",
    description: `View and download the professional resume of ${siteConfig.name}.`,
  },
};

function getCloudinaryPdfPreviewUrl(url: string) {
  if (!url || !url.includes("res.cloudinary.com")) return "";

  // Cloudinary only allows image transformations (like pg_1 and .jpg)
  // on files with the 'image' resource type.
  if (!url.includes("/image/upload/")) {
    return "";
  }

  const cleanUrl = url.split("?")[0];

  return cleanUrl
    .replace("/image/upload/", "/image/upload/pg_1,f_jpg,q_auto,w_1400/")
    .replace(/\.pdf$/i, ".jpg");
}

function getGoogleDrivePreviewUrl(url: string) {
  if (!url || !url.includes("drive.google.com")) return null;
  const idMatch = url.match(/\/d\/([^/]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }
  return null;
}

export default async function ResumePage() {
  let resumeUrl = "";

  try {
    await dbConnect();
    const settings = await SiteSettings.findOne({ key: "main" })
      .select("resumeUrl")
      .lean<{ resumeUrl?: string }>();
    resumeUrl = settings?.resumeUrl || "";
  } catch (error) {
    console.error("[ResumePage] Database connection failed:", error);
    // Fallback to empty string if DB fails
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Shivam Gaur",
      jobTitle: "Software Developer",
      url: `${siteConfig.url}/resume`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-24 pb-12 w-full px-4">
        <ResumeHeader />
        <ResumeViewer resumeUrl={resumeUrl} />
      </div>
    </>
  );
}
