"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSettings } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

export default function ResumePage() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings()
      .then((s) => {
        if (s.resumeUrl) {
          // Use Google Docs viewer which provides a cleaner white background for PDFs
          let embedUrl = s.resumeUrl;
          if (embedUrl.includes("drive.google.com")) {
            const fileIdMatch = embedUrl.match(/\/d\/([^\/]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
              embedUrl = `https://docs.google.com/viewer?url=https://drive.google.com/uc?id=${fileIdMatch[1]}&embedded=true`;
            }
          }
          setResumeUrl(embedUrl);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">Resume</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          My professional background and qualifications.
        </p>
      </motion.div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-transparent border-border/50">
        <CardContent className="flex-1 bg-transparent p-0 flex flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[1000px]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : resumeUrl ? (
            <div className="w-full h-[850px]">
              <iframe
                src={resumeUrl}
                className="w-full h-full border-0 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none"
                title="Resume PDF"
                allow="autoplay"
                scrolling="no"
              >
              <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground">
                <p>
                  Unable to load PDF. Please check the resume link in admin
                  settings.
                </p>
              </div>
            </iframe>
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8 text-center text-muted-foreground">
              <p className="mb-4">No resume has been uploaded yet.</p>
              <p className="text-sm">
                Go to the <strong>Admin Dashboard</strong> to set your resume
                link.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
