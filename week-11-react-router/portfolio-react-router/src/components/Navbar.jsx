import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-200">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        About
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        Projects
      </NavLink>
    </nav>
  );
}
