//utils/axiosClient.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";

/* --- Extend AxiosRequestConfig so TS knows about _retry --- */
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const BASE_URL = "http://localhost:3000/api";

/* --- Create main client (used by app) --- */
export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/* --- Create a separate client WITHOUT interceptors for refresh calls --- */
export const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/* --- Queue of pending requests while refresh is running --- */
let isRefreshing = false;
type PendingRequest = {
  resolve: (value?: any) => void;
  reject: (err: any) => void;
  config: AxiosRequestConfig;
};
let pendingRequests: PendingRequest[] = [];

function processQueue(error: any | null, token: string | null = null) {
  pendingRequests.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }
    if (token) {
      // config.headers = config.headers || {};
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }; //config headers use AxiosHeaders not plain objects
    }
    //. Refresh-while-refreshing queueing logic AND preserve request data
    const clonedConfig = {
      ...config,
      data: config.data ? JSON.parse(JSON.stringify(config.data)) : undefined,
    };
    resolve(axiosClient(clonedConfig));
  });
  pendingRequests = [];
}

// --- attach token to every request ---
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* --- Response interceptor to handle 401s & refresh --- */
axiosClient.interceptors.response.use(
  (response) => response,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig;

    // If no response or not a 401, just reject
    if (!err.response || err.response.status !== 401) {
      return Promise.reject(err);
    }

    // If this request already retried, avoid infinite loop
    if (originalRequest?._retry) {
      return Promise.reject(err);
    }

    // Avoid trying to refresh when the request itself is the refresh endpoint
    if (originalRequest?.url?.includes("/auth/refresh")) {
      // If refresh itself returned 401, we should fail fast
      return Promise.reject(err);
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject, config: originalRequest });
      });
    }

    // Start a refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call refresh endpoint using a non-intercepted client to avoid recursion
      const refreshRes = await refreshClient.post("/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      const newAccessToken = refreshRes.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("No access token in refresh response");
      }

      // Update axios default header for subsequent requests
      axiosClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;

      // Persist token if you store tokens in localStorage (or call your token service)
      try {
        localStorage.setItem("accessToken", newAccessToken);
      } catch (e) {
        // ignore storage errors (or handle them)
      }

      // Resolve queued requests with new token
      processQueue(null, newAccessToken);

      // Retry original request with new token
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosClient(originalRequest);
    } catch (refreshErr) {
      // Refresh failed — reject queued requests + optionally redirect / logout
      processQueue(refreshErr, null);
      // Clean up
      isRefreshing = false;
      // Optionally clear tokens (localStorage) here
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } catch (_) {}
      localStorage.clear();
      return Promise.reject(refreshErr);
    } finally {
      // Ensure resetting the flag if not already cleared
      isRefreshing = false;
    }
  }
);

export default axiosClient;
