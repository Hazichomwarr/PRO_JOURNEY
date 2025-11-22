//api/userApi.ts
import axiosClient from "../lib/axiosClient";
import { UserPublic } from "../models/user";

export const getCurrentUser = async () => {
  try {
    const res = await axiosClient.get("/auth/me");
    return { ...res.data, id: res.data._id };
  } catch (err) {
    console.error("AUTH ME error:", err);
  }
};

export const updateUser = async ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<UserPublic>;
}) => {
  try {
    const res = await axiosClient.put(`/users/${id}`, updates);
    return res.data;
  } catch (err) {
    console.error("error:", err);
  }
};

//delete user
export const deleteUser = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("error:", err);
  }
};
