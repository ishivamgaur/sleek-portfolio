import axios from "axios";

// Single Source of Truth for all API configurations
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Standardized fetcher function specifically for SWR caching
export const fetcher = (url: string) =>
  apiClient.get(url).then((res) => res.data);

export default apiClient;
