//pages/RequestResetPwd.tsx
import { useState } from "react";
import InputField from "../components/ui/InputField";
import { requestPasswordReset } from "../api/userApi";
import { useFlashStore } from "../store/flashStore";
import { useNavigate } from "react-router-dom";

export default function RequestPasswordReset() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const addFlash = useFlashStore((s) => s.addFlash);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error) return null;

    try {
      await requestPasswordReset(userEmail);
      addFlash("Request sent. Check your email.", "success");
      navigate("/reset-password");
    } catch (err: any) {
      addFlash(err.response.data.error, "error");
    } finally {
      setUserEmail("");
      setError("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[300px] mx-auto my-10 p-6 border rounded-lg shadow-md"
    >
      <span>Email</span>
      <InputField
        type="text"
        value={userEmail}
        error={error}
        placeholder="Enter your Email"
        changeFn={(e) => setUserEmail(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
