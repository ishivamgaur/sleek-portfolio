import { Project } from "@/components/portfolio/ProjectCard";
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
    // Career & Ambition
    { _id: "1", title: "Work at a FAANG company", completed: false },
    { _id: "2", title: "Build a tech startup", completed: false },
    { _id: "25", title: "Build a SaaS product", completed: false },
    { _id: "3", title: "Work abroad", completed: false },

    // Travel & Exploration
    { _id: "4", title: "Travel to Japan", completed: false },
    { _id: "5", title: "Travel to Switzerland", completed: false },
    { _id: "6", title: "Travel to Kashmir", completed: false },
    { _id: "7", title: "Visit all 12 Jyotirlingas", completed: false },

    // Milestones & Adrenaline
    { _id: "8", title: "Take family on a flight", completed: false },
    { _id: "9", title: "Bungee jumping", completed: false },
    { _id: "10", title: "Skydiving & Parachuting", completed: false },
    { _id: "11", title: "Run a marathon", completed: false },
    {
      _id: "12",
      title: "Watch a stadium match with close friends",
      completed: false,
    },

    // Skills & Personal Growth
    { _id: "13", title: "Build a great physique", completed: false },
    { _id: "14", title: "Learn to swim", completed: false },
    { _id: "15", title: "Learn to play guitar", completed: false },
    { _id: "16", title: "Learn to sing", completed: false },
    { _id: "17", title: "Read my first book fully", completed: false },
    { _id: "18", title: "Read 100 books", completed: false },
    { _id: "19", title: "Read 500 books", completed: false },
    { _id: "20", title: "Learn how to be patient", completed: false },

    // Possessions & Lifestyle
    { _id: "21", title: "Buy a house", completed: false },
    { _id: "22", title: "Buy a car", completed: false },
    { _id: "23", title: "Get a MacBook Pro", completed: false },
    { _id: "24", title: "Build a gaming setup", completed: false },
  ],

  favoriteMovies: [
    {
      _id: "1",
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      year: "1994",
    },
    {
      _id: "2",
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      year: "1999",
    },
    {
      _id: "3",
      title: "Harry Potter Film Series",
      director: "Chris Columbus, Alfonso Cuarón, Mike Newell, David Yates",
      year: "2001",
    },
    {
      _id: "4",
      title: "Spider-Man Trilogy (Tobey Maguire)",
      director: "Sam Raimi",
      year: "2002",
    },
    {
      _id: "5",
      title: "Batman Begins",
      director: "Christopher Nolan",
      year: "2005",
    },
    {
      _id: "6",
      title: "The Dark Knight",
      director: "Christopher Nolan",
      year: "2008",
    },
    {
      _id: "7",
      title: "Iron Man Trilogy",
      director: "Jon Favreau, Shane Black",
      year: "2008",
    },
    {
      _id: "8",
      title: "Inception",
      director: "Christopher Nolan",
      year: "2010",
    },
    {
      _id: "9",
      title: "Captain America Trilogy",
      director: "Joe Johnston, Russo Brothers",
      year: "2011",
    },
    {
      _id: "10",
      title: "The Avengers",
      director: "Joss Whedon",
      year: "2012",
    },
    {
      _id: "11",
      title: "The Dark Knight Rises",
      director: "Christopher Nolan",
      year: "2012",
    },
    {
      _id: "12",
      title: "The Amazing Spider-Man Series (Andrew Garfield)",
      director: "Marc Webb",
      year: "2012",
    },
    {
      _id: "13",
      title: "Interstellar",
      director: "Christopher Nolan",
      year: "2014",
    },
    {
      _id: "14",
      title: "The Martian",
      director: "Ridley Scott",
      year: "2015",
    },
    {
      _id: "15",
      title: "Batman v Superman: Dawn of Justice",
      director: "Zack Snyder",
      year: "2016",
    },
    {
      _id: "16",
      title: "Spider-Man MCU Trilogy (Tom Holland)",
      director: "Jon Watts",
      year: "2017",
    },
    {
      _id: "17",
      title: "Avengers: Infinity War",
      director: "Russo Brothers",
      year: "2018",
    },
    {
      _id: "18",
      title: "Avengers: Endgame",
      director: "Russo Brothers",
      year: "2019",
    },
    {
      _id: "19",
      title: "Gullak",
      director: "Amrit Raj Gupta",
      year: "2019",
    },
    {
      _id: "20",
      title: "Panchayat",
      director: "Deepak Kumar Mishra",
      year: "2020",
    },
    {
      _id: "21",
      title: "The Batman",
      director: "Matt Reeves",
      year: "2022",
    },
  ],
};

export const QUOTES = [
  // General / Tech
  {
    text: "The only way to do great work is to love what you do. Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },

  // Death Note
  { text: "I am Justice!", author: "L, Death Note" },
  {
    text: "If you can't win the game, if you can't solve the puzzle, you're nothing but a loser.",
    author: "Near, Death Note",
  },
  {
    text: "In this world, there are very few people who actually trust each other.",
    author: "Light Yagami, Death Note",
  },
  {
    text: "The human world is a boring place with boring people doing boring things.",
    author: "Ryuk, Death Note",
  },
  {
    text: "Apples in the human world are worth the trip.",
    author: "Ryuk, Death Note",
  },
  {
    text: "As long as it doesn't kill me, I don't care.",
    author: "Ryuk, Death Note",
  },
  {
    text: "You have lost, Light. Didn't I say in the beginning... when you die, the one who'll write your name down in a notebook will be me.",
    author: "Ryuk, Death Note",
  },
  {
    text: "I'll take a potato chip... and eat it!",
    author: "Light Yagami, Death Note",
  },
  {
    text: "This world is rotten, and those who are making it rot deserve to die.",
    author: "Light Yagami, Death Note",
  },
  {
    text: "Kira is childish and he hates losing... I am also childish and I hate to lose. That's how I know.",
    author: "L, Death Note",
  },
  {
    text: "Sometimes, the questions are complicated – and the answers are simple.",
    author: "L, Death Note",
  },
  {
    text: "Being alone is better than being with the wrong person.",
    author: "L, Death Note",
  },
  {
    text: "Learn to treasure your life because unfortunately, it can be taken away from you anytime.",
    author: "L, Death Note",
  },
  {
    text: "Look around you, and all you will see are people the world would be better off without.",
    author: "Light Yagami, Death Note",
  },
  {
    text: "There is no heaven or hell. No matter what you do while you're alive, everybody goes to the same place once you die. Death is Equal.",
    author: "Death Note",
  },
  {
    text: "By trying too hard, we put ourselves at a greater risk.",
    author: "L, Death Note",
  },
  {
    text: "Nobody can tell what is right and what is wrong, what is righteous and what is evil.",
    author: "Near, Death Note",
  },
  {
    text: "If you don't cross any lines, you'll never know where they are.",
    author: "Light Yagami, Death Note",
  },
  {
    text: "Risking your life and doing something that could easily rob you of your life are exact opposites.",
    author: "L, Death Note",
  },

  // Marvel / Spider-Man
  { text: "Part of the journey is the end.", author: "Tony Stark, Marvel" },
  {
    text: "The hardest choices require the strongest wills.",
    author: "Thanos, Marvel",
  },
  { text: "What is grief, if not love persevering?", author: "Vision, Marvel" },
  {
    text: "With great power comes great responsibility.",
    author: "Uncle Ben, Spider-Man",
  },
  {
    text: "Whatever comes our way, whatever battle we have raging inside us, we always have a choice.",
    author: "Peter Parker, Spider-Man",
  },
  {
    text: "Sometimes, to do what's right, we have to be steady and give up the thing we want the most. Even our dreams.",
    author: "Peter Parker, Spider-Man 2",
  },
  {
    text: "Not everyone is meant to make a difference. But for me, the choice to lead an ordinary life is no longer an option.",
    author: "Peter Parker, Spider-Man",
  },
  {
    text: "I believe there's a hero in all of us.",
    author: "Aunt May, Spider-Man 2",
  },
  {
    text: "No man can win every battle, but no man should fall without a struggle.",
    author: "Peter Parker, Spider-Man",
  },
  { text: "I am Iron Man.", author: "Tony Stark, Marvel" },
  { text: "I love you 3000.", author: "Tony Stark, Marvel" },
  { text: "I can do this all day.", author: "Steve Rogers, Marvel" },
  {
    text: "But a thing isn't beautiful because it lasts. It's a privilege to be among them.",
    author: "Vision, Marvel",
  },
  {
    text: "I'm with you 'til the end of the line.",
    author: "Steve Rogers, Marvel",
  },
  {
    text: "That's my secret, Captain. I'm always angry.",
    author: "Bruce Banner, Marvel",
  },
  { text: "Dormammu, I've come to bargain.", author: "Doctor Strange, Marvel" },
  {
    text: "You could not live with your own failure. Where did that bring you? Back to me.",
    author: "Thanos, Marvel",
  },
  {
    text: "Perfectly balanced, as all things should be.",
    author: "Thanos, Marvel",
  },
  {
    text: "It's not about how much we lost. It's about how much we have left.",
    author: "Tony Stark, Marvel",
  },
  { text: "I am inevitable.", author: "Thanos, Marvel" },
  {
    text: "Vengeance has consumed you. It's consuming them. I'm done letting it consume me.",
    author: "T'Challa, Marvel",
  },
  {
    text: "The price of freedom is high, it always has been. And it's a price I'm willing to pay.",
    author: "Steve Rogers, Marvel",
  },
  {
    text: "He may have been your father, boy, but he wasn't your daddy.",
    author: "Yondu, Marvel",
  },

  // Harry Potter
  {
    text: "It is not our abilities that show what we truly are. It is our choices.",
    author: "Albus Dumbledore, Harry Potter",
  },
  {
    text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    author: "Albus Dumbledore, Harry Potter",
  },
  {
    text: "We've all got both light and dark inside us. What matters is the part we choose to act on. That's who we really are.",
    author: "Sirius Black, Harry Potter",
  },
  {
    text: "Things we lose have a way of coming back to us in the end, if not always in the way we expect.",
    author: "Luna Lovegood, Harry Potter",
  },

  // The Shawshank Redemption
  {
    text: "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
    author: "The Shawshank Redemption",
  },
  {
    text: "Get busy living, or get busy dying.",
    author: "The Shawshank Redemption",
  },
  {
    text: "Fear can hold you prisoner. Hope can set you free.",
    author: "The Shawshank Redemption",
  },

  // Batman Movies
  {
    text: "Why do we fall? So that we can learn to pick ourselves up.",
    author: "Thomas Wayne, Batman Begins",
  },
  {
    text: "It's not who I am underneath, but what I do that defines me.",
    author: "Batman, Batman Begins",
  },
  {
    text: "A hero can be anyone. Even a man doing something as simple and reassuring as putting a coat around a young boy's shoulders.",
    author: "Batman, The Dark Knight Rises",
  },
  {
    text: "The night is darkest just before the dawn. And I promise you, the dawn is coming.",
    author: "Harvey Dent, The Dark Knight",
  },
  {
    text: "You either die a hero, or you live long enough to see yourself become the villain.",
    author: "Harvey Dent, The Dark Knight",
  },
  {
    text: "Some men aren't looking for anything logical, like money... Some men just want to watch the world burn.",
    author: "Alfred Pennyworth, The Dark Knight",
  },
  {
    text: "If you're good at something, never do it for free.",
    author: "The Joker, The Dark Knight",
  },
  { text: "Why so serious?", author: "The Joker, The Dark Knight" },

  // Inception
  {
    text: "An idea is like a virus. Resilient. Highly contagious.",
    author: "Cobb, Inception",
  },
  {
    text: "Dreams feel real while we're in them. It's only when we wake up that we realize something was actually strange.",
    author: "Cobb, Inception",
  },
  {
    text: "You mustn't be afraid to dream a little bigger, darling.",
    author: "Eames, Inception",
  },

  // The Matrix
  {
    text: "There is a difference between knowing the path and walking the path.",
    author: "Morpheus, The Matrix",
  },
  {
    text: "I can only show you the door. You're the one that has to walk through it.",
    author: "Morpheus, The Matrix",
  },
  {
    text: "Choice is an illusion, created between those with power, and those without.",
    author: "Merovingian, The Matrix",
  },

  // Shree Krishna (Bhagavad Gita)
  {
    text: "You have the right to work, but never to the fruit of work.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "Man is made by his belief. As he believes, so he is.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "It is better to live your own destiny imperfectly than to live an imitation of somebody else's life with perfection.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "For him who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "There is neither this world, nor the world beyond, nor happiness for the one who doubts.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "We are kept from our goal not by obstacles, but by a clear path to a lesser goal.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "Hell has three gates: lust, anger, and greed.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "A man's own self is his friend. A man's own self is his foe.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "Whatever happened, happened for the good. Whatever is happening, is happening for the good. Whatever will happen, will also happen for the good.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "Perform your obligatory duty, because action is indeed better than inaction.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "You came empty-handed, and you will leave empty-handed.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "Change is the law of the universe. You can be a millionaire, or a pauper in an instant.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "The soul is neither born, and nor does it die.",
    author: "Shree Krishna, Bhagavad Gita",
  },
  {
    text: "He who has no attachments can really love others, for his love is pure and divine.",
    author: "Shree Krishna, Bhagavad Gita",
  },

  // Other GOATed movies
  {
    text: "We used to look up at the sky and wonder at our place in the stars. Now we just look down, and worry about our place in the dirt.",
    author: "Cooper, Interstellar",
  },
  {
    text: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space.",
    author: "Brand, Interstellar",
  },
  {
    text: "I'm gonna make him an offer he can't refuse.",
    author: "Don Corleone, The Godfather",
  },
  {
    text: "Great men are not born great, they grow great.",
    author: "Mario Puzo, The Godfather",
  },
  {
    text: "The things you own end up owning you.",
    author: "Tyler Durden, Fight Club",
  },
  {
    text: "It's only after we've lost everything that we're free to do anything.",
    author: "Tyler Durden, Fight Club",
  },
  {
    text: "Life is like a box of chocolates. You never know what you're gonna get.",
    author: "Forrest Gump",
  },
  {
    text: "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",
    author: "Rocky Balboa",
  },
  {
    text: "What we do in life echoes in eternity.",
    author: "Maximus, Gladiator",
  },
  {
    text: "All we have to decide is what to do with the time that is given us.",
    author: "Gandalf, The Lord of the Rings",
  },
  {
    text: "Even the smallest person can change the course of the future.",
    author: "Galadriel, The Lord of the Rings",
  },
  {
    text: "I can't carry it for you, but I can carry you.",
    author: "Samwise Gamgee, The Lord of the Rings",
  },
  {
    text: "Some people can't believe in themselves until someone else believes in them first.",
    author: "Sean Maguire, Good Will Hunting",
  },
  { text: "May the Force be with you.", author: "Star Wars" },
];
