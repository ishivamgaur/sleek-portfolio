import mongoose from "mongoose";
import dns from "node:dns";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const MONGODB_URI = process.env.MONGODB_URI;

const ExperienceSchema = new mongoose.Schema(
  {
    role: String,
    company: String,
    location: String,
    type: String,
    content: String,
    date: String,
    startDate: String,
    tech: [String],
  },
  { timestamps: true }
);

delete mongoose.models.Experience;
const Experience = mongoose.model("Experience", ExperienceSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Clear existing experiences just in case
    await Experience.deleteMany({});

    const exps = [
      {
        role: "Full Stack Developer",
        company: "Bitmax Technology Pvt. Ltd.",
        location: "Greater Noida, Section 90",
        type: "On-site",
        content: "Developing and maintaining scalable web applications using the MERN stack. Collaborating with cross-functional teams to design and implement new features. Optimizing application performance and ensuring high-quality code through rigorous testing.",
        date: "Current",
        startDate: "Sep 2025",
        tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
      },
      {
        role: "Full Stack Developer",
        company: "Digivity Pvt. Ltd.",
        location: "Knowledge Park III, Greater Noida",
        type: "On-site",
        content: "Built responsive and interactive user interfaces using React.js. Integrated RESTful APIs and managed state with Redux for seamless data flow. Participated in code reviews and mentored junior developers to improve overall team productivity.",
        date: "Aug 2025",
        startDate: "Dec 2024",
        tech: ["React", "JavaScript", "Redux", "CSS3", "HTML5"],
      },
      {
        role: "MERN Stack Developer (Training)",
        company: "QSpiders",
        location: "Noida",
        type: "On-site",
        content: "Completed intensive training in Full Stack Development with a focus on the MERN stack. Mastered MongoDB, Express.js, React.js, and Node.js through hands-on projects. Gained proficiency in modern JavaScript (ES6+), version control with Git, and agile methodologies.",
        date: "Nov 2024",
        startDate: "Jun 2024",
        tech: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
      }
    ];

    await Experience.insertMany(exps);
    console.log("Successfully seeded experiences!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
