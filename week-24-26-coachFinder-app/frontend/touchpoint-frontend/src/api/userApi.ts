//api/userApi.ts
import axiosClient from "../lib/axiosClient";

export const getCurrentUser = async () => {
  try {
    const res = await axiosClient.get("/auth/me");
    console.log("AUTH ME response:", res.data);
    return res.data;
  } catch (err) {
    console.error("AUTH ME error:", err);
  }
};
