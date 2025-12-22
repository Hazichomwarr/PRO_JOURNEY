"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

let session = true; //fake manual session for now

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    session = false;
    router.push("/");
  }
  return (
    <nav className="flex justify-between items-center max-w-full px-6 py-2 text-xl font-bold ">
      <Link href="/" className="text-blue-600 bg-amber-50 p-4 rounded-full">
        Contact Manager
      </Link>
      <ul className="flex gap-4 items-center">
        {session ? (
          <>
            <Link
              href="/contacts"
              className="cursor-pointer hover:scale-105 hover:text-blue-600 transition-transform"
            >
              Contacts
            </Link>
            <LogoutButton onLogout={handleLogout} />
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="cursor-pointer hover:scale-105 hover:text-blue-600 transition-transform"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="cursor-pointer hover:scale-105 hover:text-blue-600 transition-transform"
            >
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
