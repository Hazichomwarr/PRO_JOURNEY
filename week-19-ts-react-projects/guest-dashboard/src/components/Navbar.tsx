import { NavLink } from "react-router-dom";
import { navLinkClass } from "../utils/navlinkClass";

export default function Navbar() {
  return (
    <nav className="bg-gray-700 p-3 text-white sticky top-0 mb-6">
      <ul className="flex items-center justify-end gap-6 text-lg">
        <NavLink
          to="/guests"
          end
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Home
        </NavLink>
        <NavLink
          to="/guests/new"
          className={({ isActive }) => navLinkClass(isActive)}
        >
          Register
        </NavLink>
      </ul>
    </nav>
  );
}
