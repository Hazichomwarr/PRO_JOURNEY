import axiosClient from "./axiosClient";

export const getCoaches = async () => {
  const res = await axiosClient.get("/coaches");
  return res.data;
};
