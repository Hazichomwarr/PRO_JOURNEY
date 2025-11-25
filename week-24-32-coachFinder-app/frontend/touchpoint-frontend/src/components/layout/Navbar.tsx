//components/layout/Navbar.tsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { navLinkClass } from "../../utils/navLinkClass";
import { useAuthStore } from "../../store/authStore";
import FlashRenderer from "../ui/FlashRenderer";
import { useState } from "react";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isRequest, setIsRequest] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home");
    setIsRequest(false);
  };

  const links = [
    { to: "/", label: "Home", auth: "any" },
    { to: "/dashboard", label: "Dashboard", auth: "auth" },
    { to: "/register", label: "Register", auth: "guest" },
  ];

  const filteredLinks = links.filter((l) => {
    if (l.auth === "any") return true;
    if (l.auth === "auth") return isAuthenticated;
    if (l.auth === "guest") return !isAuthenticated;
    return false; //explicit return
  });

  return (
    <>
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

        {/* NAVLINKS */}
        <ul className="flex items-center gap-6 text-lg">
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
      </nav>

      <ConfirmLogoutModal
        isRequest={isRequest}
        setIsRequest={setIsRequest}
        onLogout={handleLogout}
      />

      <FlashRenderer />
    </>
  );
}
