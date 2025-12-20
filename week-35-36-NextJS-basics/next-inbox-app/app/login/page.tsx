//login/page.tsx
import { redirect } from "next/navigation";
import { createSession } from "../lib/auth";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email");
    if (!email) return;

    // fake auth for now
    await createSession("user_123");
    redirect("/dashboard");
  }

  return (
    <form action={login} className="mx-auto mt-20 max-w-sm space-y-4">
      <input name="email" placeholder="Email" className="w-full border p-2" />
      <button
        className="w-full bg-gray-600 p-2 text-white cursor-pointer rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
