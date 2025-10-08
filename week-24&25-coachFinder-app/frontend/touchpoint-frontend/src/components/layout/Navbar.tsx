//components/layout/Navbar.tsx
import { NavLink } from "react-router-dom";
import { navLinkClass } from "../../utils/navLinkClass";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 px-8 py-4 text-white shadow-md sticky top-0 z-50">
      {/* APP LOGO */}
      <div className="logo">
        <img
          src="/logo.png"
          alt="TouchPoint logo"
          className="w-32 object-contain"
        />
      </div>

      {/* NAVLINKS */}
      <ul className="flex items-center justify-end gap-6 text-lg">
        <NavLink
          to="/"
          end
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Home
        </NavLink>
        <NavLink
          to="/coaches"
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Coaches
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/sessions"
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Sessions
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Login
        </NavLink>
      </ul>
    </nav>
  );
}
