import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <div className="flex flex-col pb-12">
      <Hero />
      <div className="px-4">
        <div className="w-full h-px bg-border/40 my-8" />
      </div>
      <Experience />
      <div className="px-4">
        <div className="w-full h-px bg-border/40 my-8" />
      </div>
      <Projects />
    </div>
  );
}
