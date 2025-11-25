//api/userApi.ts
import { axiosClient } from "../lib/axiosClient";
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

//New password Change handler
export const passwordChangeRequest = async (
  values: PasswordFormValues,
  id: string
) => {
  await axiosClient.patch(`/users/change-password/${id}`, values);
};

//( inside userApi.ts file)
//REQUEST PASSWORD RESET API
export const requestPasswordReset = async (email: string) => {
  await axiosClient.post("/auth/request-password-reset", { email });
};

//RESET PASSWORD  API
export const passwordResetValues = async (
  values: PasswordFormValues,
  token: string
) => {
  await axiosClient.post(`/auth/reset-password`, {
    token,
    newPassword: values.newPassword,
    confirmNewPassword: values.confirmNewPassword,
  });
};

//delete user
export const deleteUser = async (id: string) => {
  const res = await axiosClient.delete(`/users/${id}`);
  return res.data;
};
