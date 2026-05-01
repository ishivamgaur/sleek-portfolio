import { Project } from "@/components/ProjectCard";
import { ExperienceData } from "@/services/api";

export const portfolioData = {
  projects: [
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
  ] as Project[],

  experiences: [
    {
      _id: "exp1",
      role: "Full Stack Developer",
      company: "Bitmax Technology Pvt. Ltd.",
      startDate: "2025-09-01",
      date: "Current",
      location: "Greater Noida, Section 90",
      type: "On-site",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
      content:
        "Developing and maintaining scalable web applications using the MERN stack.\nCollaborating with cross-functional teams to design and implement new features.\nOptimizing application performance and ensuring high-quality code through rigorous testing.",
    },
    {
      _id: "exp2",
      role: "Full Stack Developer",
      company: "Digivity Pvt. Ltd.",
      startDate: "2024-12-01",
      date: "2025-08-31",
      location: "Knowledge Park III, Greater Noida",
      type: "On-site",
      tech: ["React", "JavaScript", "Redux", "CSS3", "HTML5"],
      content:
        "Built responsive and interactive user interfaces using React.js.\nIntegrated RESTful APIs and managed state with Redux for seamless data flow.\nParticipated in code reviews and mentored junior developers to improve overall team productivity.",
    },
    {
      _id: "exp3",
      role: "MERN Stack Developer (Training)",
      company: "QSpiders",
      startDate: "2024-06-01",
      date: "2024-11-30",
      location: "Noida",
      type: "On-site",
      tech: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
      content:
        "Completed intensive training in Full Stack Development with a focus on the MERN stack.\nMastered MongoDB, Express.js, React.js, and Node.js through hands-on projects.\nGained proficiency in modern JavaScript (ES6+), version control with Git, and agile methodologies.",
    },
  ] as ExperienceData[],

  settings: {
    bannerImage:
      "https://images.unsplash.com/photo-1507238692062-8e0ec06eadec?q=80&w=1200&auto=format&fit=crop",
    profileImage: "/profile-pic.jpg",
  },

  stories: [
    {
      _id: "s1",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      mediaType: "photo",
      createdAt: new Date().toISOString(),
    },
  ],
};
