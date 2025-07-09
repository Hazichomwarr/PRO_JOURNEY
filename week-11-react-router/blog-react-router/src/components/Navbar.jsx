import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-6 text-white sticky top-0">
      <ul className="flex items-center justify-end gap-6 text-xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-4 py-2 rounded" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-4 py-2 rounded" : ""
          }
        >
          About
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-4 py-2 rounded" : ""
          }
        >
          Blog
        </NavLink>
      </ul>
    </nav>
  );
};
