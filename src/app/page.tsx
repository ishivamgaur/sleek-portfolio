import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col pb-12">
      <Hero />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px bg-border/40 my-8" />
        <Projects />
      </div>
    </div>
  );
}
