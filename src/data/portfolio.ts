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
      company: "Bitmax Technology",
      startDate: "2025-09-01",
      date: "Current",
      location: "Greater Noida, Section 90",
      shortLocation: "Gr. Noida, Sec 90",
      type: "On-site",
      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Tailwind",
        "TypeScript",
        "Redux",
        "GraphQL",
        "Jest",
      ],
      content:
        "Architecting and developing high-performance, scalable enterprise web applications utilizing the robust MERN stack.\nSpearheading the transition to modern React architectures and advanced state management, resulting in significant improvements in Core Web Vitals and page load times.\nCollaborating directly with product managers and UI/UX designers to translate complex business requirements into intuitive, accessible, and responsive interfaces.\nDesigning secure RESTful APIs, implementing comprehensive JWT-based authentication, and optimizing complex database aggregation pipelines in MongoDB.\nLeading code review sessions, establishing strict deployment pipelines, and enforcing clean code practices to ensure long-term maintainability.",
    },
    {
      _id: "exp2",
      role: "Full Stack Developer",
      company: "Digivity",
      startDate: "2024-12-01",
      date: "2025-08-31",
      location: "Knowledge Park III, Greater Noida",
      shortLocation: "KP III, Gr. Noida",
      type: "On-site",
      tech: [
        "React",
        "JavaScript",
        "Redux",
        "Tailwind",
        "WebSockets",
        "HTML5",
        "CSS3",
        "Git",
      ],
      content:
        "Engineered and deployed highly responsive, interactive user interfaces utilizing React.js and Redux Toolkit for complex global state management.\nIntegrated third-party RESTful APIs, payment gateways, and real-time data channels to deliver feature-rich, dynamic client portals.\nOptimized front-end rendering bottlenecks by implementing lazy loading, code splitting, and memoization techniques, vastly improving the mobile user experience.\nActively participated in Agile/Scrum methodologies, consistently delivering sprint milestones on time and contributing to technical planning sessions.\nMentored junior developers through pair programming and code reviews, establishing best practices for scalable JavaScript development.",
    },
    {
      _id: "exp3",
      role: "MERN Stack Developer (Training)",
      company: "QSpiders",
      startDate: "2024-06-01",
      date: "2024-11-30",
      location: "Noida",
      type: "On-site",
      tech: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "JavaScript",
        "Mongoose",
        "Postman",
        "Git",
      ],
      content:
        "Successfully completed a rigorous, fast-paced Full Stack Web Development program with a specialized focus on the MERN ecosystem and modern JavaScript (ES6+).\nDeveloped multiple full-stack capstone projects from scratch, handling both front-end component architecture and back-end server logic.\nMastered database schema design with Mongoose, built custom APIs with Express.js, and implemented secure user authentication flows.\nGained extensive hands-on experience with Git version control, branch management, and collaborative development workflows in a simulated professional environment.\nDemonstrated a deep understanding of asynchronous programming, closures, and the React component lifecycle during technical assessments.",
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

  bucketList: [
    { _id: "1", title: "Build a tech startup", completed: false },
    { _id: "2", title: "Travel to Japan", completed: false },
    { _id: "3", title: "Master Next.js & React ecosystem", completed: true },
    {
      _id: "4",
      title: "Contribute to an open-source project",
      completed: false,
    },
    { _id: "5", title: "Speak at a tech conference", completed: false },
    { _id: "6", title: "Run a marathon", completed: false },
    { _id: "7", title: "Write a technical blog/book", completed: false },
    { _id: "8", title: "Learn to play an instrument", completed: false },
  ],

  favoriteMovies: [
    {
      _id: "1",
      title: "Interstellar",
      director: "Christopher Nolan",
      year: "2014",
    },
    {
      _id: "2",
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      year: "1999",
    },
    {
      _id: "3",
      title: "Inception",
      director: "Christopher Nolan",
      year: "2010",
    },
    {
      _id: "4",
      title: "The Social Network",
      director: "David Fincher",
      year: "2010",
    },
    {
      _id: "5",
      title: "Spider-Man: Into the Spider-Verse",
      director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
      year: "2018",
    },
  ],
};
