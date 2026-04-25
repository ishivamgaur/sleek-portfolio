"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject, addStory } from "@/store/slices/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const dispatch = useDispatch();

  const [projectData, setProjectData] = useState({ title: "", description: "", link: "", tags: "" });
  const [storyData, setStoryData] = useState({ 
    role: "", 
    company: "", 
    content: "", 
    date: "", 
    startDate: "",
    location: "",
    type: "On-site",
    tech: "",
    imageUrl: "" 
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectData.title || !projectData.description) return;
    
    dispatch(addProject({
      id: Date.now().toString(),
      title: projectData.title,
      description: projectData.description,
      link: projectData.link,
      tags: projectData.tags.split(",").map(t => t.trim()).filter(Boolean),
    }));
    
    setProjectData({ title: "", description: "", link: "", tags: "" });
    alert("Project added successfully!");
  };

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyData.role || !storyData.company || !storyData.content || !storyData.startDate) return;
    
    dispatch(addStory({
      id: Date.now().toString(),
      role: storyData.role,
      company: storyData.company,
      content: storyData.content,
      date: storyData.date || 'Current',
      startDate: storyData.startDate,
      location: storyData.location || 'Noida',
      type: storyData.type,
      tech: storyData.tech.split(",").map(t => t.trim()).filter(Boolean),
      imageUrl: storyData.imageUrl || undefined,
    }));
    
    setStoryData({ 
      role: "", 
      company: "", 
      content: "", 
      date: "", 
      startDate: "",
      location: "",
      type: "On-site",
      tech: "",
      imageUrl: "" 
    });
    alert("Experience added successfully!");
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 pt-24 pb-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-[15px]">Manage your portfolio projects and professional experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Add New Project</CardTitle>
            <CardDescription>Fill in the details to add a new project.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <input 
                  type="text" 
                  value={projectData.title}
                  onChange={e => setProjectData({...projectData, title: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  value={projectData.description}
                  onChange={e => setProjectData({...projectData, description: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link</label>
                  <input 
                    type="url" 
                    value={projectData.link}
                    onChange={e => setProjectData({...projectData, link: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <input 
                    type="text" 
                    value={projectData.tags}
                    onChange={e => setProjectData({...projectData, tags: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="React, Next.js"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full font-bold">Add Project</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Add New Experience</CardTitle>
            <CardDescription>Share a milestone in your professional journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStory} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <input 
                    type="text" 
                    value={storyData.company}
                    onChange={e => setStoryData({...storyData, company: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <input 
                    type="text" 
                    value={storyData.role}
                    onChange={e => setStoryData({...storyData, role: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <input 
                    type="date" 
                    value={storyData.startDate}
                    onChange={e => setStoryData({...storyData, startDate: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date (or blank)</label>
                  <input 
                    type="date" 
                    value={storyData.date}
                    onChange={e => setStoryData({...storyData, date: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <input 
                    type="text" 
                    value={storyData.location}
                    onChange={e => setStoryData({...storyData, location: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Noida"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select 
                    value={storyData.type}
                    onChange={e => setStoryData({...storyData, type: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tech Stack (Comma separated)</label>
                <input 
                  type="text" 
                  value={storyData.tech}
                  onChange={e => setStoryData({...storyData, tech: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="React, Nextjs, Tailwind"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description (End each bullet with a period)</label>
                <textarea 
                  value={storyData.content}
                  onChange={e => setStoryData({...storyData, content: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  required
                />
              </div>
              <Button type="submit" className="w-full font-bold">Add Experience</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
