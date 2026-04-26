"use client";

import { ArrowUpRight } from "lucide-react";
import { ProjectCard, Project } from "@/components/ProjectCard";

// Mock data (In a real scenario, this would be fetched from MongoDB on the server side)
const projects: Project[] = [
  {
    _id: "1",
    title: "Portfolio Website",
    description:
      "A sleek, modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion for ultra-smooth animations.",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    link: "https://github.com/ishivamgaur",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507238692062-8e0ec06eadec?q=80&w=600&auto=format&fit=crop",
    videoUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FjcW12cm1oN2w3bWZlaDN0cWRzYWw3ZG5qamJpMmtwd2Rla2RkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif",
  },
  {
    _id: "2",
    title: "Full Stack E-Commerce",
    description:
      "A complete MERN stack e-commerce platform with Stripe integration, Redux state management, and an admin dashboard.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop",
    videoUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9sZnV6aXk0a2E2YzEwZWh3OTI3YzEwaHRrZWV5NWE4ZWY0YzMwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jIGsO4/giphy.gif",
  },
  {
    _id: "3",
    title: "AI Chat Application",
    description:
      "Real-time AI chat application leveraging WebSockets and OpenAI's API for intelligent conversation capabilities.",
    tags: ["OpenAI", "Socket.io", "React", "Node.js"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
  },
];

export default function AllProjectsPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 pt-24 pb-12 w-full flex flex-col space-y-8">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight leading-none">
          Projects
        </h1>
        <p className="text-muted-foreground mt-1 text-[15px]">
          A comprehensive archive of everything I've built, open-sourced, or
          experimented with.
        </p>
      </div>

      {/* Full Grid of all projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40 flex-1">
        {projects.map((project, idx) => (
          <ProjectCard key={project._id} project={project} idx={idx} />
        ))}
      </div>

      {/* Back to Top Button */}
      <div className="pt-12 pb-4 flex justify-center mt-auto">
        <button
          onClick={scrollToTop}
          className="text-[13px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
        >
          Back to top
          <ArrowUpRight className="w-4 h-4 -rotate-45" />
        </button>
      </div>
    </div>
  );
}
