// // utils/axiosClient.ts
// import axios, { AxiosError, AxiosRequestConfig } from "axios";

// const BASE_URL = "http://localhost:3000/api";

// // singleton on globalThis to avoid duplicate instances
// const globalAny = globalThis as any;

// if (!globalAny._axiosClient) {
//   // main client
//   const axiosClient = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//   });

//   // separate client used only for refresh (no interceptors)
//   const refreshClient = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//   });

//   // ---- helper: attach latest access token to config ----
//   const attachToken = (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   };

//   // ---- request interceptor: always attach freshest token ----
//   axiosClient.interceptors.request.use(
//     (config) => attachToken(config || {}),
//     (error) => Promise.reject(error)
//   );

//   // ---- refresh queue state ----
//   let isRefreshing = false;
//   let refreshSubscribers: Array<(token: string | null) => void> = [];

//   function onRefreshed(token: string | null) {
//     refreshSubscribers.forEach((cb) => cb(token));
//     refreshSubscribers = [];
//   }

//   function addRefreshSubscriber(cb: (token: string | null) => void) {
//     refreshSubscribers.push(cb);
//   }

//   // ---- response interceptor: handle 401 with single refresh ----
//   axiosClient.interceptors.response.use(
//     (res) => res,
//     async (
//       error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
//     ) => {
//       const originalRequest = error.config;

//       // if no originalRequest or not 401 -> reject
//       if (!originalRequest || error.response?.status !== 401) {
//         return Promise.reject(error);
//       }

//       // avoid infinite loop
//       if (originalRequest._retry) {
//         return Promise.reject(error);
//       }
//       originalRequest._retry = true;

//       // if a refresh is already in progress, wait for it
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           addRefreshSubscriber((token: string | null) => {
//             if (token) {
//               originalRequest.headers = {
//                 ...originalRequest.headers,
//                 Authorization: `Bearer ${token}`,
//               };
//               resolve(axiosClient(originalRequest));
//             } else {
//               reject(new Error("Could not refresh access token"));
//             }
//           });
//         });
//       }

//       // start refresh
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("No refresh token available");

//         // important: send refreshToken in body
//         const { data } = await refreshClient.post("/auth/refresh", {
//           refreshToken,
//         });

//         const newToken = data?.accessToken;
//         if (!newToken) throw new Error("No access token returned by refresh");

//         // save and update default header
//         localStorage.setItem("accessToken", newToken);
//         axiosClient.defaults.headers = axiosClient.defaults.headers || {};
//         axiosClient.defaults.headers.common =
//           axiosClient.defaults.headers.common || {};
//         axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

//         // notify queued requests
//         onRefreshed(newToken);

//         // retry original request with new header
//         originalRequest.headers = {
//           ...originalRequest.headers,
//           Authorization: `Bearer ${newToken}`,
//         };

//         return axiosClient(originalRequest);
//       } catch (refreshErr) {
//         // clear tokens and notify subscribers with failure
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         onRefreshed(null);
//         return Promise.reject(refreshErr);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//   );

//   globalAny._axiosClient = axiosClient;
//   globalAny._refreshClient = refreshClient;
// }

// // export default singleton
// export default globalAny._axiosClient as ReturnType<typeof axios.create>;

// // utils/axiosClient.ts
// import axios, { AxiosError, AxiosRequestConfig } from "axios";

// // 🧱 Base API URL
// const BASE_URL = "http://localhost:3000/api";

// // 🧠 Reuse global instance across reloads/imports
// const globalAxios = globalThis as typeof globalThis & {
//   axiosClient?: ReturnType<typeof axios.create>;
//   refreshClient?: ReturnType<typeof axios.create>;
// };

// // 🪄 Create or reuse existing instances
// const axiosClient =
//   globalAxios.axiosClient ||
//   axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//   });

// const refreshClient =
//   globalAxios.refreshClient ||
//   axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//   });

// // store globally so it’s reused everywhere
// globalAxios.axiosClient = axiosClient;
// globalAxios.refreshClient = refreshClient;

// // 🔑 Attach access token before every request
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🔁 Auto-refresh on 401
// axiosClient.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     try {
//       const { data } = await refreshClient.post("/auth/refresh", {
//         refreshToken: localStorage.getItem("refreshToken"),
//       });

//       const newToken = data?.accessToken;
//       if (!newToken) throw new Error("No new access token returned");

//       localStorage.setItem("accessToken", newToken);
//       axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

//       originalRequest.headers = {
//         ...originalRequest.headers,
//         Authorization: `Bearer ${newToken}`,
//       };

//       return axiosClient(originalRequest);
//     } catch (err) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       return Promise.reject(err);
//     }
//   }
// );

// export default axiosClient;

//utils/axiosClient.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";

/* --- Extend AxiosRequestConfig so TS knows about _retry --- */
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

/* --- Create main client (used by app) --- */
const BASE_URL = "http://localhost:3000/api";
export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/* --- Create a separate client WITHOUT interceptors for refresh calls --- */
const refreshClient = axios.create({
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
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    resolve(axiosClient(config));
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
      const refreshRes = await refreshClient.post("/auth/refresh");
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
      // Redirect to login (or better: call auth store logout)
      window.location.href = "/login";
      return Promise.reject(refreshErr);
    } finally {
      // Ensure resetting the flag if not already cleared
      isRefreshing = false;
    }
  }
);

axiosClient.interceptors.request.use((config) => {
  console.log("🚨 Outgoing request path:", config.url);
  return config;
});

export default axiosClient;

// // utils/axiosClient.ts
// import axios, { AxiosError, AxiosRequestConfig } from "axios";

// // --- Base API setup ---
// const BASE_URL = "http://localhost:3000/api";

// export const axiosClient = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// // --- Separate client for refresh calls (no interceptors) ---
// const refreshClient = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// // --- Add access token before every request ---
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // --- Handle 401s: try refresh, then retry once ---
// axiosClient.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig;

//     // Ignore if not a 401
//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true; // mark as retried

//     try {
//       const { data } = await refreshClient.post("/auth/refresh");
//       const newToken = data?.accessToken;

//       if (!newToken) throw new Error("No new access token returned");

//       // Save token + set header for next calls
//       localStorage.setItem("accessToken", newToken);
//       axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

//       // Create a new config object for the retried request
//       const retriedRequestConfig: AxiosRequestConfig = {
//         ...originalRequest,
//         headers: {
//           ...originalRequest.headers,
//           Authorization: `Bearer ${newToken}`,
//         },
//       };

//       return axiosClient(retriedRequestConfig); // Retry the original request with the new config
//     } catch (refreshErr) {
//       // refresh failed — clear token + reject
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       return Promise.reject(refreshErr);
//     }
//   }
// );

// export default axiosClient;
