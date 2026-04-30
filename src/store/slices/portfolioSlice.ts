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
  bannerImage: string;
  profileImage: string;
}

const initialState: PortfolioState = {
  bannerImage: "/banner.jpg",
  profileImage: "https://github.com/ishivamgaur.png?size=200",
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
    updateBannerImage: (state, action: PayloadAction<string>) => {
      state.bannerImage = action.payload;
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  addProject,
  removeProject,
  addStory,
  removeStory,
  updateBannerImage,
  updateProfileImage,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
