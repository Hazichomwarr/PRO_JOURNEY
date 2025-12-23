import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { logoutAction } from "../actions/auth";
import { getSession } from "../_lib/session";

export default async function Navbar() {
  const session = await getSession();

  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <nav className="flex justify-between items-center max-w-full px-6 py-2 text-xl font-bold shadow-lg">
      <Link
        href="/"
        className="text-blue-600 bg-amber-50 p-4 rounded-full border-black border text-sm"
      >
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
            <LogoutButton onLogout={logoutAction} />
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
