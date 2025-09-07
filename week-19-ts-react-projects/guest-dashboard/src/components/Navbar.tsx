//components/Navbar.tsx
import { NavLink, useLocation } from "react-router-dom";
import { navLinkClass } from "../utils/navlinkClass";
import { Search, User, X } from "lucide-react";
import { useGuestContext } from "../context/useGuestContext";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useGuestContext();
  const location = useLocation();

  //show search only on home/guests
  const showSearch =
    location.pathname === "/" || location.pathname === "/guests";

  return (
    <nav className="flex justify-between items-center bg-gray-700 p-3 text-white sticky top-0">
      <div className="flex gap-2 items-center">
        <User className="w-6 h-6 text-gray-500" />

        {/* SEARCH BAR */}
        {showSearch && (
          <div className="relative">
            <Search className=" absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2 py-1 rounded-md border border-gray-500 bg-gray-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Show "X" only if there's text */}
            {searchQuery && (
              <button
                className="absolute right-1 bottom-2 text-gray-300 hover:text-white"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" aria-label="Clear search" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* NAVLINKS */}
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
