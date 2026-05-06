"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function ResumeHeader() {
  return (
    <div className="mb-10 space-y-1">
      <FadeIn delay={0.1} direction="up">
        <h2 className="text-2xl font-bold tracking-tight">Resume</h2>
      </FadeIn>
      <FadeIn delay={0.2} direction="up">
        <p className="text-muted-foreground text-[15px]">
          A detailed overview of my professional qualifications and background.
        </p>
      </FadeIn>
    </div>
  );
}
