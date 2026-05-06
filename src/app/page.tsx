import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Personal from "@/components/sections/Personal";
import FadeIn from "@/components/animations/FadeIn";

const sections = [Hero, About, Experience, Projects, Personal];

export default function Home() {
  return (
    <div className="flex flex-col pb-12">
      {sections.map((Section, i) => (
        <div key={i} className="mb-14">
          <Section />
        </div>
      ))}
    </div>
  );
}
