import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-700 p-3 text-white sticky top-0 mb-6">
      <ul className="flex items-center justify-end gap-6 text-lg">
        <NavLink
          to="/guests"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-2 py-1 rounded" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/guests/new"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-2 py-1 rounded" : ""
          }
        >
          Register
        </NavLink>
      </ul>
    </nav>
  );
}
