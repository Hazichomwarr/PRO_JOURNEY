import axios from "axios";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api",
  withCredentials: true,
});
export default axiosClient;
