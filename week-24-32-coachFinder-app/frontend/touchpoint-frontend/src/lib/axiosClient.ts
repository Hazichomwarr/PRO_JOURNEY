//utils/axiosClient.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  HeadersDefaults,
  AxiosHeaders,
  AxiosRequestHeaders,
} from "axios";

/* --- Extend AxiosRequestConfig so TS knows about _retry --- */
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    //allow arbitrary custom metadata
    meta?: Record<string, unknown>;
  }
}

/* ----------------------------- Config ------------------------------ */
const BASE_URL = "http://localhost:3000/api";

/* --------------------------- Token Service ------------------------- */
/**
 * Access token is stored ONLY in memory.
 * Provide getters/setters and a simple subscribe mechanism so UI can react.
 */
class TokenService {
  private accessToken: string | null = null;
  private subscribers: Set<(token: string | null) => void> = new Set();

  getToken() {
    return this.accessToken;
  }

  setToken(token: string | null) {
    this.accessToken = token;
    this.subscribers.forEach((fn) => fn(token));
  }

  subscribe(fn: (token: string | null) => void) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
}

export const tokenService = new TokenService();

/* ----------------------- CSRF token helper ------------------------- */
/**
 * Server must expose a CSRF token in a non-httpOnly cookie named 'XSRF-TOKEN'
 * OR in a <meta name="csrf-token" content="..."> tag.
 * This helper reads either place (meta tag preferred).
 */
function getCsrfToken(): string | null {
  //meta tag
  const meta = document.querySelector(
    "meta[name='csrf-token']"
  ) as HTMLMetaElement | null;
  if (meta?.content) return meta.content;

  //cookie fallback (simple parser)
  const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/* ------------------------ Axios instances ------------------------- */
/**
 * Main client: used by app components. It has interceptors attached.
 * withCredentials is true so browser will send httpOnly cookies (refresh token).
 */
export const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * Refresh client: a minimal instance used to call /auth/refresh.
 * It DOES NOT have the response interceptor attached to avoid recursion.
 */
export const refreshClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/* --------------- Utilities: safe header merging -------------------- */
function mergeAuthHeader(config: AxiosRequestConfig, token: string) {
  //don't mutate original headers obj in place(could be axiosHeaders or plain obj)
  const existingHeaders =
    (config.headers as Record<string, unknown> | undefined) ?? {};
  const newHeaders = { ...existingHeaders, Authorization: `Bearer ${token}` };
  config.headers = newHeaders;
  return config;
}

/* ----------------------- Refresh queue system ---------------------- */
type PendingRequest = {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (err: any) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let pendingQueue: PendingRequest[] = [];

function processQueue(error: any | null, token: string | null = null) {
  pendingQueue.forEach(({ resolve, reject, config }) => {
    if (error) reject(error);
    else if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }; //config headers use AxiosHeaders not plain objects
    } else {
      // no token provided: reject
      reject(new Error("No token available to retry request"));
    }
    //. Refresh-while-refreshing queueing logic AND preserve request data
    const clonedConfig = {
      ...config,
      data: config.data ? JSON.parse(JSON.stringify(config.data)) : undefined,
    };
    resolve(axiosClient(clonedConfig));
  });
  pendingQueue = [];
}

/* ---------------------- Request interceptor ----------------------- */
/**
 * Attach access token from in-memory TokenService (if present).
 * Also attach CSRF token to state-changing requests.
 */
axiosClient.interceptors.request.use(
  (config) => {
    //Attach token (in-memory)
    const token = tokenService.getToken();
    if (token) {
      // safer header merge
      mergeAuthHeader(config, token);
    }
    //Attach CSRF token for state-changing methods
    const method = (config.method || "get").toLowerCase();
    if (["post", "put", "patch", "delete"].includes(method)) {
      const csrf = getCsrfToken();
      if (csrf) {
        // config.headers = { ...config.headers, "X-CSRF-TOKEN": csrf };
        const h = AxiosHeaders.from(config.headers);
        h.set("X-CSRF-TOKEN", csrf);
        config.headers = h;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------------- Response interceptor ---------------------- */
/**
 * Handles 401 -> attempt refresh flow.
 * - Ensures only one refresh request runs at a time.
 * - Queues other failed requests while refreshing.
 * - Uses refreshClient to avoid recursion.
 * - On success: updates in-memory tokenService and retries queued requests.
 * - On failure: rejects queued requests and triggers token cleanup.
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig | undefined;

    // If there's no config or it's not a 401, just reject
    if (!originalRequest || !error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Avoid retry loop on refresh endpoint itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // If this request already got retried, avoid infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If refresh is in progress — queue and return a promise that resolves when refresh completes
    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        pendingQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    // Start refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // CSRF token (if required by server)
      const csrf = getCsrfToken();

      // Call refresh endpoint using refreshClient (no interceptors attached)
      const refreshResponse = await refreshClient.post(
        "/auth/refresh",
        // No body required if server uses httpOnly cookie for refresh token.
        null,
        {
          headers: csrf ? { "X-CSRF-Token": csrf } : undefined,
          withCredentials: true,
        }
      );

      const newAccessToken = refreshResponse.data?.accessToken as
        | string
        | undefined;
      if (!newAccessToken) {
        throw new Error("Refresh succeeded but no access token returned");
      }

      // Persist in-memory
      tokenService.setToken(newAccessToken);

      // Resolve pending requests with new token (they will be retried)
      processQueue(null, newAccessToken);

      // Retry original request — clone config and set header
      const retryConfig = {
        ...originalRequest,
        headers: {
          ...(originalRequest.headers as Record<string, unknown> | undefined),
        },
      };
      retryConfig.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosClient(retryConfig as AxiosRequestConfig);
    } catch (refreshError) {
      // On refresh failure reject queued requests and clear token
      processQueue(refreshError, null);
      tokenService.setToken(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
/* --------------------------- Exports ------------------------------ */
export default axiosClient;
