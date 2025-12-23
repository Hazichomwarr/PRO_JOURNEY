//app/_components/LoginForm.tsx
"use client";

import { loginAction } from "../actions/auth";

export default function LoginForm() {
  return (
    <form
      action={loginAction}
      className="flex flex-col gap-2 items-center w-full"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="border p-2 rounded w-3/5"
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        className="border p-2 rounded w-3/5"
      />
      <button
        type="submit"
        className="w-3/5 bg-blue-500 px-2 py-1 text-white cursor-pointer hover:bg-blue-600 rounded mt-2 active:scale-95"
      >
        Login
      </button>
    </form>
  );
}
