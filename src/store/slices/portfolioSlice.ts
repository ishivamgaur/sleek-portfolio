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
  title: string;
  content: string;
  date: string;
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
      title: 'Joined Software Development',
      content: 'Started my journey as a software engineer, diving into MERN stack and beyond.',
      date: '2024-06-01',
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
