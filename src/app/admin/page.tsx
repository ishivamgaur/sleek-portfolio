"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject, addStory } from "@/store/slices/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const dispatch = useDispatch();

  const [projectData, setProjectData] = useState({ title: "", description: "", link: "", tags: "" });
  const [storyData, setStoryData] = useState({ title: "", content: "", date: "", imageUrl: "" });

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
    if (!storyData.title || !storyData.content || !storyData.date) return;
    
    dispatch(addStory({
      id: Date.now().toString(),
      title: storyData.title,
      content: storyData.content,
      date: storyData.date,
      imageUrl: storyData.imageUrl || undefined,
    }));
    
    setStoryData({ title: "", content: "", date: "", imageUrl: "" });
    alert("Story added successfully!");
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio projects and stories here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>Fill in the details to add a new project to your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <input 
                  type="text" 
                  value={projectData.title}
                  onChange={e => setProjectData({...projectData, title: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  value={projectData.description}
                  onChange={e => setProjectData({...projectData, description: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link (Optional)</label>
                <input 
                  type="url" 
                  value={projectData.link}
                  onChange={e => setProjectData({...projectData, link: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={projectData.tags}
                  onChange={e => setProjectData({...projectData, tags: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="React, Tailwind, Next.js"
                />
              </div>
              <Button type="submit" className="w-full">Add Project</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Story</CardTitle>
            <CardDescription>Share a milestone or story in your developer journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStory} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Title</label>
                <input 
                  type="text" 
                  value={storyData.title}
                  onChange={e => setStoryData({...storyData, title: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input 
                  type="date" 
                  value={storyData.date}
                  onChange={e => setStoryData({...storyData, date: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL (Optional)</label>
                <input 
                  type="url" 
                  value={storyData.imageUrl}
                  onChange={e => setStoryData({...storyData, imageUrl: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <textarea 
                  value={storyData.content}
                  onChange={e => setStoryData({...storyData, content: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Story</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
