/**
 * Centralized API service layer.
 * Repeated calls to the same endpoint cancel the previous in-flight request.
 */

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object;
  dedupeKey?: string;
  parseAs?: "json" | "void";
};

const pendingRequests = new Map<string, AbortController>();

function isPlainObject(value: unknown): value is object {
  return (
    typeof value === "object" && value !== null && !(value instanceof FormData)
  );
}

async function apiRequest<T>(
  url: string,
  {
    method = "GET",
    headers,
    body,
    dedupeKey,
    parseAs = "json",
    ...init
  }: ApiRequestOptions = {},
): Promise<T> {
  const requestKey = dedupeKey || `${method.toUpperCase()}:${url}`;

  pendingRequests.get(requestKey)?.abort();

  const controller = new AbortController();
  pendingRequests.set(requestKey, controller);

  const normalizedHeaders = new Headers(headers);
  let requestBody: BodyInit | undefined;

  if (body instanceof FormData || typeof body === "string") {
    requestBody = body;
  } else if (isPlainObject(body)) {
    normalizedHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, {
      ...init,
      method,
      headers: normalizedHeaders,
      body: requestBody,
      signal: controller.signal,
    });

    if (parseAs === "void") {
      if (!res.ok) throw new Error("Request failed");
      return undefined as T;
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request canceled");
    }
    throw error;
  } finally {
    if (pendingRequests.get(requestKey) === controller) {
      pendingRequests.delete(requestKey);
    }
  }
}

export async function login(email: string, password: string) {
  return apiRequest<{ success: boolean }>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function logout() {
  await apiRequest<void>("/api/auth/logout", {
    method: "POST",
    parseAs: "void",
  });
}

export async function changePassword(email: string, currentPassword: string, newPassword: string) {
  return apiRequest<{ success: boolean; message: string }>("/api/auth/change-password", {
    method: "POST",
    body: { email, currentPassword, newPassword },
  });
}

export async function checkAuth(): Promise<boolean> {
  const data = await apiRequest<{ authenticated: boolean }>("/api/auth/check");
  return data.authenticated;
}

export interface SiteSettings {
  resumeUrl?: string;
}

export async function fetchSettings(): Promise<SiteSettings> {
  return apiRequest<SiteSettings>("/api/settings", {
    cache: "no-store",
  });
}

export async function updateSettings(
  settings: Partial<SiteSettings>,
): Promise<SiteSettings> {
  return apiRequest<SiteSettings>("/api/settings", {
    method: "PUT",
    body: settings,
  });
}

export interface StoryData {
  _id?: string;
  imageUrl: string;
  mediaType?: "photo" | "video";
  createdAt?: string;
}

export async function fetchStories(): Promise<StoryData[]> {
  return apiRequest<StoryData[]>("/api/stories");
}

export async function createStory(
  story: Omit<StoryData, "_id">,
): Promise<StoryData> {
  return apiRequest<StoryData>("/api/stories", {
    method: "POST",
    body: story,
  });
}

export async function deleteStory(id: string): Promise<void> {
  await apiRequest<void>(`/api/stories/${id}`, {
    method: "DELETE",
    parseAs: "void",
  });
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  todayUniqueVisitors: number;
  last7Days: Array<{
    date: string;
    visits: number;
    uniqueVisitors: number;
  }>;
  popularPages: Array<{
    path: string;
    visits: number;
  }>;
}

export async function fetchAnalytics(): Promise<AnalyticsStats> {
  return apiRequest<AnalyticsStats>("/api/analytics");
}

export async function trackVisit(
  path: string,
  referrer: string,
): Promise<void> {
  await apiRequest<void>("/api/analytics", {
    method: "POST",
    body: { path, referrer },
    credentials: "same-origin",
    keepalive: true,
    parseAs: "void",
  });
}

export interface GitHubStats {
  followers?: number;
  publicRepos?: number;
  stars?: number;
  profileUrl?: string;
  createdAt?: string;
}

export async function fetchGithubStats(): Promise<GitHubStats> {
  return apiRequest<GitHubStats>("/api/github");
}

export interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
  albumImageUrl?: string;
}

export async function fetchSpotify(): Promise<SpotifyData> {
  return apiRequest<SpotifyData>("/api/spotify");
}

export interface ExperienceData {
  _id?: string;
  role: string;
  company: string;
  location: string;
  shortLocation?: string;
  type: string;
  content: string;
  date: string;
  startDate: string;
  tech?: string[];
}

export async function fetchExperiences(): Promise<ExperienceData[]> {
  return apiRequest<ExperienceData[]>("/api/experiences");
}

export async function createExperience(
  exp: Omit<ExperienceData, "_id">,
): Promise<ExperienceData> {
  return apiRequest<ExperienceData>("/api/experiences", {
    method: "POST",
    body: exp,
  });
}
