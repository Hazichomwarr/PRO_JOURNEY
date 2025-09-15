import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-gray-700 p-3 text-white sticky top-0">
      {/* NAVLINKS */}
      <ul className="flex items-center justify-end gap-6 text-lg">
        <NavLink
          to="/tasks"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 font-medium px-2 py-1 rounded transition-colors duration-300"
              : "hover:bg-orange-400/30 px-2 py-1 rounded transition-colors duration-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/tasks/new"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-600 font-medium px-2 py-1 rounded transition-colors duration-300"
              : "hover:bg-orange-400/30 px-2 py-1 rounded transition-colors duration-300"
          }
        >
          Add-Task
        </NavLink>
      </ul>
    </nav>
  );
}
