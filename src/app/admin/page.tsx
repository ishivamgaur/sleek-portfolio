"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  addStory,
  updateBannerImage,
  updateProfileImage,
} from "@/store/slices/portfolioSlice";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import { checkAuth, login, logout, fetchSettings, updateSettings, createStory, createExperience } from "@/services/api";

export default function AdminPage() {
  const dispatch = useDispatch();
  const bannerImg = useSelector(
    (state: RootState) => state.portfolio.bannerImage,
  );
  const profileImg = useSelector(
    (state: RootState) => state.portfolio.profileImage,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  // Check auth + fetch current settings on mount
  useEffect(() => {
    checkAuth()
      .then((authed) => setIsLoggedIn(authed))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));

    fetchSettings()
      .then((s) => {
        setBannerUrl(s.bannerImage);
        setProfileUrl(s.profileImage);
      })
      .catch(() => {});
  }, []);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    link: "",
    tags: "",
  });
  const [storyData, setStoryData] = useState({
    imageUrl: "",
    mediaType: "photo" as "photo" | "video",
  });
  const [expData, setExpData] = useState({
    role: "",
    company: "",
    content: "",
    date: "",
    startDate: "",
    location: "",
    type: "On-site",
    tech: "",
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectData.title || !projectData.description) return;

    dispatch(
      addProject({
        id: Date.now().toString(),
        title: projectData.title,
        description: projectData.description,
        link: projectData.link,
        tags: projectData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    );

    setProjectData({ title: "", description: "", link: "", tags: "" });
    alert("Project added successfully!");
  };

  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyData.imageUrl) {
      alert("Please upload a media file first.");
      return;
    }

    try {
      await createStory({
        imageUrl: storyData.imageUrl,
        mediaType: storyData.mediaType,
      });
      alert("Story added successfully!");
      setStoryData({ imageUrl: "", mediaType: "photo" });
    } catch (err: any) {
      alert(err.message || "Failed to add story");
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expData.role || !expData.company || !expData.content || !expData.startDate) return;

    try {
      await createExperience({
        role: expData.role,
        company: expData.company,
        content: expData.content,
        date: expData.date || "Current",
        startDate: expData.startDate,
        location: expData.location || "Noida",
        type: expData.type,
        tech: expData.tech.split(",").map((t) => t.trim()).filter(Boolean),
      });
      alert("Experience added successfully!");
      setExpData({
        role: "",
        company: "",
        content: "",
        date: "",
        startDate: "",
        location: "",
        type: "On-site",
        tech: "",
      });
    } catch (err: any) {
      alert(err.message || "Failed to add experience");
    }
  };

  const handleUpdateImages = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSettings({
        bannerImage: bannerUrl || undefined,
        profileImage: profileUrl || undefined,
      });
      if (bannerUrl) dispatch(updateBannerImage(bannerUrl));
      if (profileUrl) dispatch(updateProfileImage(profileUrl));
      alert("Images updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update images");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      await login(email, password);
      setIsLoggedIn(true);
      setPassword("");
      setEmail("");
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your password to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4  pt-24 pb-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-[15px]">
            Manage your portfolio projects and professional experience.
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Site Media</CardTitle>
            <CardDescription>
              Update your banner and profile pictures.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateImages} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                      placeholder="Paste URL or upload"
                    />
                    <FileUpload
                      accept="image/*"
                      label="Upload"
                      uploadType="banner"
                      onUploadComplete={(url) => setBannerUrl(url)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Profile Image</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      placeholder="Paste URL or upload"
                    />
                    <FileUpload
                      accept="image/*"
                      label="Upload"
                      uploadType="profile"
                      onUploadComplete={(url) => setProfileUrl(url)}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto font-bold">
                Update Images
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
            <CardTitle className="text-xl">Add New Project</CardTitle>
            <CardDescription>
              Fill in the details to add a new project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  type="text"
                  value={projectData.title}
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input
                    type="url"
                    value={projectData.link}
                    onChange={(e) =>
                      setProjectData({ ...projectData, link: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input
                    type="text"
                    value={projectData.tags}
                    onChange={(e) =>
                      setProjectData({ ...projectData, tags: e.target.value })
                    }
                    placeholder="React, Next.js"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full font-bold">
                Add Project
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Add New Story</CardTitle>
            <CardDescription>
              Upload a photo or video to your story.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStory} className="space-y-4">
              <div className="space-y-2">
                <Label>Story Media (Required)</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={storyData.imageUrl}
                    onChange={(e) =>
                      setStoryData({ ...storyData, imageUrl: e.target.value })
                    }
                    placeholder="Paste URL or upload"
                    required
                  />
                  <FileUpload
                    accept="image/*,video/*"
                    label="Upload"
                    uploadType="story"
                    onUploadComplete={(url) =>
                      setStoryData({ ...storyData, imageUrl: url, mediaType: url.includes("/video/upload/") ? "video" : "photo" })
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="w-full font-bold">
                Add Story
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Add New Experience</CardTitle>
            <CardDescription>
              Share a milestone in your professional journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExperience} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    type="text"
                    value={expData.company}
                    onChange={(e) =>
                      setExpData({ ...expData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    type="text"
                    value={expData.role}
                    onChange={(e) =>
                      setExpData({ ...expData, role: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={expData.startDate}
                    onChange={(e) =>
                      setExpData({ ...expData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date (or blank)</Label>
                  <Input
                    type="date"
                    value={expData.date}
                    onChange={(e) =>
                      setExpData({ ...expData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    type="text"
                    value={expData.location}
                    onChange={(e) =>
                      setExpData({ ...expData, location: e.target.value })
                    }
                    placeholder="Noida"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={expData.type}
                    onValueChange={(val: string | null) =>
                      setExpData({ ...expData, type: val || "On-site" })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tech Stack (Comma separated)</Label>
                <Input
                  type="text"
                  value={expData.tech}
                  onChange={(e) =>
                    setExpData({ ...expData, tech: e.target.value })
                  }
                  placeholder="React, Nextjs, Tailwind"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (End each bullet with a period)</Label>
                <Textarea
                  value={expData.content}
                  onChange={(e) =>
                    setExpData({ ...expData, content: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full font-bold">
                Add Experience
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
