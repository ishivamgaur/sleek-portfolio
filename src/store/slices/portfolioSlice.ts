import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
}

export interface Story {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string; // e.g. On-site, Remote
  content: string; // Bullet points separated by dots
  date: string; // End date or "Current"
  startDate: string;
  tech?: string[]; // e.g. ["React", "Node.js"]
  imageUrl?: string;
}

interface PortfolioState {
  projects: Project[];
  stories: Story[];
}

const initialState: PortfolioState = {
  projects: [
    {
      id: '1',
      title: 'Portfolio Website',
      description: 'A sleek, modern portfolio website built with Next.js and Tailwind CSS.',
      tags: ['Next.js', 'React', 'Tailwind', 'Redux'],
    },
  ],
  stories: [
    {
      id: '1',
      role: 'Full Stack Developer',
      company: 'Bitmax Technology Pvt. Ltd.',
      location: 'Greater Noida, Section 90',
      type: 'On-site',
      startDate: '2025-09-01',
      date: 'Current',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
      content: 'Developing and maintaining scalable web applications using the MERN stack. Collaborating with cross-functional teams to design and implement new features. Optimizing application performance and ensuring high-quality code through rigorous testing.',
    },
    {
      id: '2',
      role: 'Full Stack Developer',
      company: 'Digivity Pvt. Ltd.',
      location: 'Knowledge Park III, Greater Noida',
      type: 'On-site',
      startDate: '2024-12-01',
      date: '2025-08-30',
      tech: ['React', 'JavaScript', 'Redux', 'CSS3', 'HTML5'],
      content: 'Built responsive and interactive user interfaces using React.js. Integrated RESTful APIs and managed state with Redux for seamless data flow. Participated in code reviews and mentored junior developers to improve overall team productivity.',
    },
    {
      id: '3',
      role: 'MERN Stack Developer (Training)',
      company: 'QSpiders',
      location: 'Noida',
      type: 'On-site',
      startDate: '2024-06-01',
      date: '2024-11-30',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
      content: 'Completed intensive training in Full Stack Development with a focus on the MERN stack. Mastered MongoDB, Express.js, React.js, and Node.js through hands-on projects. Gained proficiency in modern JavaScript (ES6+), version control with Git, and agile methodologies.',
    },
  ],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.push(action.payload);
    },
    removeStory: (state, action: PayloadAction<string>) => {
      state.stories = state.stories.filter(s => s.id !== action.payload);
    },
  },
});

export const { addProject, removeProject, addStory, removeStory } = portfolioSlice.actions;
export default portfolioSlice.reducer;
