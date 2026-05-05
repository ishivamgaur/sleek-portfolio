import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Personal from "@/components/Personal";

function Separator() {
  return (
    <div className="px-4">
      <div className="w-full h-px bg-border my-10" />
    </div>
  );
}

const sections = [Hero, About, Experience, Projects, Personal];

export default function Home() {
  return (
    <div className="flex flex-col gap-14 pb-12">
      {sections.map((Section, i) => (
        <div key={i}>
          <Section />
        </div>
      ))}
    </div>
  );
}
