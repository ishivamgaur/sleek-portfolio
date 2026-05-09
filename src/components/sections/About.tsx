"use client";

import FadeIn from "@/components/animations/FadeIn";

const highlights = [
  {
    title: "What I build",
    text: "Building scalable architectures, intuitive interfaces, and high-impact MVPs.",
  },
  {
    title: "How I think",
    text: "Solving real problems by breaking complex systems into simple, efficient flows.",
  },
  {
    title: "What I care about",
    text: "Clean code, high performance, and building products that are built to last.",
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
            "Hi, I'm Shivam. I bridge the gap between complex backend engineering and intuitive user design to build products that scale and endure.",
            "I am an engineer who solves problems first. I specialize in architecting high-performance systems and shipping lean MVPs that turn ambitious ideas into reality.",
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
