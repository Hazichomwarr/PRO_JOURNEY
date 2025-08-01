import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-gray-700 p-6 text-white sticky top-0">
      <ul className="flex items-center justify-end gap-6 text-xl">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-4 py-2 rounded" : ""
          }
        >
          Users-list
        </NavLink>
        <NavLink
          to="/new"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-4 py-2 rounded" : ""
          }
        >
          Add-User
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "bg-orange-600 font-medium px-4 py-2 rounded" : ""
          }
        >
          Posts
        </NavLink>
      </ul>
    </nav>
  );
};
