//app/login/page.tsx
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-3 w-[60%] mx-auto my-2 py-4 shadow-lg rounded bg-gray-50">
      <h3 className="text-2xl font-bold">Login</h3>
      <LoginForm />
      <p className="text-xs">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-800 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
