//components/layout/DesktopNavbar.tsx
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { navLinkClass } from "../../utils/navLinkClass";
import React from "react";
import { NavLinkItem } from "./Navbar";
import NavbarHamburger from "./NavbarHamburger";

interface Props {
  setIsRequest: React.Dispatch<React.SetStateAction<boolean>>;
  filteredLinks: NavLinkItem[];
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DesktopNavbar({
  setIsRequest,
  filteredLinks,
  mobileOpen,
  setMobileOpen,
}: Props) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <nav className="flex justify-between items-center bg-gray-800 px-8 py-3 text-white shadow-md sticky top-0 z-50">
      {/* LOGO */}
      <Link
        to="/home"
        className="cursor-pointer hover:scale-105 transition-transform"
      >
        <img
          src="/logo.png"
          alt="TouchPoint logo"
          className="w-32 object-contain rounded-lg"
        />
      </Link>

      {/* DESKTOP NAV */}
      <ul className="hidden md:flex items-center gap-6 text-lg">
        {filteredLinks.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}

        <li>
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={() => setIsRequest(true)}
              className="px-2 py-1 hover:opacity-80 transition"
            >
              Logout
            </button>
          )}
        </li>
      </ul>

      {/* HAMBURGER ICON */}
      <div className="md:hidden">
        <NavbarHamburger
          isOpen={mobileOpen}
          onToggle={() => setMobileOpen((prev) => !prev)}
        />
      </div>
    </nav>
  );
}
