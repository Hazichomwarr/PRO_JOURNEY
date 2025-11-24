//api/userApi.ts
import axiosClient from "../lib/axiosClient";
import { UserPublic } from "../models/user";
import { PasswordFormValues } from "../pages/dashboard/ChangePassword";

export const getCurrentUser = async () => {
  const res = await axiosClient.get("/auth/me");
  return { ...res.data, id: res.data._id };
};

export const updateUser = async ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<UserPublic>;
}) => {
  const res = await axiosClient.put(`/users/${id}`, updates);
  return res.data;
};

//( inside userApi.ts file)
//New password handler
export const passwordChangeRequest = async (
  values: PasswordFormValues,
  id: string
) => {
  const res = await axiosClient.patch(`/users/change-password/${id}`, values);
  console.log("password change message ->", res.data);
};

//delete user
export const deleteUser = async (id: string) => {
  const res = await axiosClient.delete(`/users/${id}`);
  return res.data;
};
