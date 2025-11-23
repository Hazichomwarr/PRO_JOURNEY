//pages/dashboard/ChangePassword.tsx
import { useState } from "react";
import InputField from "../../components/ui/InputField";
import { useAuthStore } from "../../store/authStore";
import { useFlashStore } from "../../store/flashStore";
import { passwordChangeRequest } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export interface PasswordFormValues {
  newPassword: string;
  confirmNewPassword: string;
}

const initialPasswordValues: PasswordFormValues = {
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePassword() {
  const userId = useAuthStore((s) => s.user?.id);
  const logout = useAuthStore((s) => s.logout);

  const navigate = useNavigate();

  const [values, setValues] = useState<PasswordFormValues>(
    initialPasswordValues
  );
  const [errors, setErrors] = useState<Partial<PasswordFormValues>>({});

  if (!userId) {
    useFlashStore.getState().addFlash("User Not found", "error");
    return null;
  }

  const validateValues = (values: PasswordFormValues) => {
    let errors: Partial<PasswordFormValues> = {};
    if (!values.newPassword.trim() || values.newPassword.length < 10) {
      errors.newPassword = "Password must be at least 10 chars.";
    }
    if (values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords don't match.";
    }
    setErrors(errors);
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

    validateValues(values);
    if (Object.keys(errors).length > 0) {
      return null;
    }
    try {
      await passwordChangeRequest(values, userId);
      useFlashStore
        .getState()
        .addFlash("Password Change success. Login", "success", 7000);
      logout();
      navigate("/login");
    } catch (err) {
      useFlashStore.getState().addFlash("Something went wrong", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
      <h3>New Password</h3>
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
