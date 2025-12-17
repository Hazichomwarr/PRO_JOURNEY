//pages/ResetPassword.tsx
import React, { useState } from "react";
import { PasswordFormValues } from "./dashboard/ChangePassword";
import { passwordResetValues } from "../api/userApi";
import { useFlashStore } from "../store/flashStore";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import AlertMessage from "../components/ui/AlertMessage";

const initialPwdValues: PasswordFormValues = {
  newPassword: "",
  confirmNewPassword: "",
};

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    return (
      <AlertMessage
        textHeader=" Something went wrong."
        redirectPath="/login"
        text="to try again"
      />
    );
  }

  const [values, setValues] = useState<PasswordFormValues>(initialPwdValues);
  const [errors, setErrors] = useState<Partial<PasswordFormValues>>({});
  const navigate = useNavigate();

  const validateValues = (values: PasswordFormValues) => {
    let errors: Partial<PasswordFormValues> = {};
    if (!values.newPassword.trim() || values.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 10 chars.";
    }
    if (values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords don't match.";
    }
    if (!/[A-Z]/.test(values.newPassword))
      errors.newPassword = "Must include at least 1 uppercase letter.";
    if (!/[0-9]/.test(values.newPassword))
      errors.newPassword = "Must include at least 1 number.";

    return errors;
  };

  const handleChange =
    (field: keyof PasswordFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => {
        return { ...prev, [field]: e.target.value };
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateValues(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return null;

    try {
      await passwordResetValues(values, token);
      useFlashStore
        .getState()
        .addFlash("Password Reset successful. Login", "success", 7000);
      navigate("/login");
    } catch (err: any) {
      useFlashStore.getState().addFlash(err.response.data.error, "error");
    } finally {
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[300px] mx-auto my-10 p-6 border rounded-lg shadow-md"
    >
      <h3>Reset Password</h3>
      <InputField
        type="password"
        name="password"
        value={values.newPassword}
        error={errors.newPassword}
        placeholder="Enter New password"
        changeFn={handleChange("newPassword")}
      />
      <InputField
        type="password"
        name="confirmPassword"
        value={values.confirmNewPassword}
        error={errors.confirmNewPassword}
        placeholder="Confirm New Password"
        changeFn={handleChange("confirmNewPassword")}
      />
      <button
        type="submit"
        className="txt-sm px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
