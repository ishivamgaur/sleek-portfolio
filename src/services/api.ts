/**
 * Centralized API service layer.
 * All API calls go through here — no fetch() scattered in components.
 */

// ─── Auth ───────────────────────────────────────────

export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function checkAuth(): Promise<boolean> {
  const res = await fetch("/api/auth/check");
  const data = await res.json();
  return data.authenticated;
}

// ─── Site Settings ──────────────────────────────────

export interface SiteSettings {
  bannerImage: string;
  profileImage: string;
  publicId?: string;
  deleteBanner?: string;
  deleteProfile?: string;
  previousBanners?: any[];
  previousProfiles?: any[];
}

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch("/api/settings");
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export async function updateSettings(
  settings: Partial<SiteSettings>,
): Promise<SiteSettings> {
  const res = await fetch("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update settings");
  return data;
}

// ─── Stories (Experiences) ──────────────────────────

export interface StoryData {
  _id?: string;
  imageUrl: string;
  mediaType?: "photo" | "video";
  createdAt?: string;
}

export async function fetchStories(): Promise<StoryData[]> {
  const res = await fetch("/api/stories");
  if (!res.ok) throw new Error("Failed to fetch stories");
  return res.json();
}

export async function createStory(
  story: Omit<StoryData, "_id">,
): Promise<StoryData> {
  const res = await fetch("/api/stories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(story),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create story");
  return data;
}

export async function deleteStory(id: string): Promise<void> {
  const res = await fetch(`/api/stories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to delete story");
  }
}

// ─── Experiences (Professional History) ─────────────

export interface ExperienceData {
  _id?: string;
  role: string;
  company: string;
  location: string;
  type: string;
  content: string;
  date: string;
  startDate: string;
  tech?: string[];
}

export async function fetchExperiences(): Promise<ExperienceData[]> {
  const res = await fetch("/api/experiences");
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}

export async function createExperience(
  exp: Omit<ExperienceData, "_id">,
): Promise<ExperienceData> {
  const res = await fetch("/api/experiences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exp),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create experience");
  return data;
}
