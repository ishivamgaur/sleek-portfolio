import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  mediaType?: "photo" | "video";
}

interface PortfolioState {
  projects: Project[];
  stories: Story[];

  // Persisted API Data
  instagramStories: any[];
  githubStats: any | null;
  spotifyData: any | null;
  hasFetchedStories: boolean;
  hasFetchedGithub: boolean;
  hasFetchedSpotify: boolean;

  // UI State
  hasLoadedResume: boolean;
}

const initialState: PortfolioState = {
  projects: [
    {
      id: "1",
      title: "Portfolio Website",
      description:
        "A sleek, modern portfolio website built with Next.js and Tailwind CSS.",
      tags: ["Next.js", "React", "Tailwind", "Redux"],
    },
  ],
  stories: [],

  instagramStories: [],
  githubStats: null,
  spotifyData: null,
  hasFetchedStories: false,
  hasFetchedGithub: false,
  hasFetchedSpotify: false,
  hasLoadedResume: false,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.push(action.payload);
    },
    removeStory: (state, action: PayloadAction<string>) => {
      state.stories = state.stories.filter((s) => s.id !== action.payload);
    },

    // API Persistence Reducers
    setInstagramStories: (state, action: PayloadAction<any[]>) => {
      state.instagramStories = action.payload;
      state.hasFetchedStories = true;
    },
    setGithubStats: (state, action: PayloadAction<any>) => {
      state.githubStats = action.payload;
      state.hasFetchedGithub = true;
    },
    setSpotifyData: (state, action: PayloadAction<any>) => {
      state.spotifyData = action.payload;
      state.hasFetchedSpotify = true;
    },
    setHasLoadedResume: (state, action: PayloadAction<boolean>) => {
      state.hasLoadedResume = action.payload;
    },
  },
});

export const {
  addProject,
  removeProject,
  addStory,
  removeStory,
  setInstagramStories,
  setGithubStats,
  setSpotifyData,
  setHasLoadedResume,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
