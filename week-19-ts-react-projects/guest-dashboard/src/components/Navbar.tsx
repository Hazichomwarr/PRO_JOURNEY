import { NavLink } from "react-router-dom";
import { navLinkClass } from "../utils/navlinkClass";
import { Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-700 p-3 text-white sticky top-0 mb-6">
      <div className="flex gap-4">
        <User className="w-6 h-6 text-gray-500" />
        <Search className="w-6 h-6 text-gray-300" />
      </div>
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
