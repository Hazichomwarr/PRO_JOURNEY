//utils/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      // handle token refresh later
      console.warn("Unauthorized, redirecting to login");
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
