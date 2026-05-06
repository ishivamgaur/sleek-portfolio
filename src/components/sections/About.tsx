"use client";

import FadeIn from "@/components/animations/FadeIn";

const highlights = [
  {
    title: "What I build",
    text: "Full-stack web apps with clean interfaces, practical APIs, and database-backed features that feel simple to use.",
  },
  {
    title: "How I think",
    text: "I like breaking messy problems into small systems, shipping the useful version first, then improving the details.",
  },
  {
    title: "What I care about",
    text: "Readable code, fast pages, secure auth, smooth interactions, and products that stay easy to maintain.",
  },
];

export default function About() {
  return (
    <section className="px-4">
      <FadeIn direction="up">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Readme.md</h2>
      </FadeIn>

      <div className="space-y-5">
        <div className="flex flex-col space-y-3">
          {[
            "I am a full-stack developer focused on building useful, polished web experiences with React, Next.js, Node.js, and MongoDB.",
            "I enjoy working across the whole product layer, from shaping the UI to designing the API and making sure the data flow stays reliable.",
          ].map((sentence, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1} direction="up">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {sentence}
              </p>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {highlights.map((item, idx) => (
            <FadeIn key={item.title} delay={0.2 + idx * 0.08} direction="up">
              <div className="h-full rounded-xl border border-dashed border-border bg-secondary/5 p-5 transition-colors hover:bg-secondary/10">
                <h3 className="text-[16px] font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[14px] mt-2">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
