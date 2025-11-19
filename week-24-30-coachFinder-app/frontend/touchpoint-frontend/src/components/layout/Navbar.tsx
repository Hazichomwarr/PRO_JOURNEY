import { NavLink, useNavigate } from "react-router-dom";
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

  return (
    <>
      <nav className="flex justify-between items-center bg-gray-800 px-8 py-3 text-white shadow-md sticky top-0 z-50">
        {/* LOGO */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/home")}
        >
          <img
            src="/logo.png"
            alt="TouchPoint logo"
            className="w-32 object-contain rounded-lg"
          />
        </div>

        {/* NAVLINKS */}
        <ul className="flex items-center gap-6 text-lg">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            {!isAuthenticated ? (
              <NavLink
                to="/register"
                className={({ isActive }) => navLinkClass(isActive)}
              >
                Register
              </NavLink>
            ) : (
              <button
                onClick={() => setIsRequest(true)}
                className={navLinkClass(false)}
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
