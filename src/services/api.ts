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
  return typeof value === "object" && value !== null && !(value instanceof FormData);
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

export async function checkAuth(): Promise<boolean> {
  const data = await apiRequest<{ authenticated: boolean }>("/api/auth/check");
  return data.authenticated;
}

export interface SiteSettings {
  bannerImage: string;
  profileImage: string;
  publicId?: string;
  deleteBanner?: string;
  deleteProfile?: string;
  previousBanners?: Array<{ url: string; publicId?: string }>;
  previousProfiles?: Array<{ url: string; publicId?: string }>;
  resumeUrl?: string;
}

export async function fetchSettings(): Promise<SiteSettings> {
  return apiRequest<SiteSettings>("/api/settings");
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
