import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="TouchPoint" className="w-28" />
      </div>

      <ul className="flex items-center gap-4">
        <NavLink to="/" className="hover:underline">
          Home
        </NavLink>
        <NavLink to="/find" className="hover:underline">
          Find a Buddy
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" className="hover:underline">
              Dashboard
            </NavLink>
            <button
              onClick={logout}
              className="ml-2 bg-orange-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register" className="hover:underline">
              Register
            </NavLink>
            <NavLink to="/login" className="ml-2 bg-blue-600 px-3 py-1 rounded">
              Login
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}
