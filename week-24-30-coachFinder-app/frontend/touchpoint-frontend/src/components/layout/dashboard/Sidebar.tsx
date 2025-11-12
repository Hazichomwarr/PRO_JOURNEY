//components/layout/dashboard/Sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Settings,
  MessageCircle,
  ScanSearch,
  UserPlus,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useLogout from "../../../hooks/useLogout";
import { useAuthStore } from "../../../store/authStore";
import { useMessagesStore } from "../../../store/messagesStore";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  const navigate = useNavigate();

  const fetchUnreadCount = useMessagesStore((s) => s.fetchUnreadCount);
  useEffect(() => {
    fetchUnreadCount(); // very light call
  }, []);

  const unreadMsgCount = useMessagesStore((s) => s.unreadCount);

  const links = [
    {
      to: "/dashboard/overview",
      label: "Overview",
      icon: <Home size={18} />,
    },
    {
      to: "/dashboard/find",
      label: "Coaches catalog",
      icon: <ScanSearch size={18} />,
    },
    {
      to: "/dashboard/messages",
      label: (
        <span className="flex items-center gap-2">
          <span>Messages</span>
          {unreadMsgCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
              {unreadMsgCount}
            </span>
          )}
        </span>
      ),
      icon: <MessageCircle size={18} />,
    },
  ];
  const settingsLinkItems = [
    { label: "Appearance", path: "appearance" },
    { label: "Edit Profile", path: "edit-profile" },
    { label: "Change Password", path: "change-password" },
  ];

  return (
    <div className=" flex flex-col justify-between p-4 space-y-6 w-64 h-screen bg-white shadow-md">
      <div>
        <h1 className="text-xl font-bold mb-8 text-blue-600">TouchPoint</h1>
        <nav className="space-y-3">
          {links.map((link) => {
            return (
              <NavLink
                to={link.to}
                key={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 
                   ${
                     isActive
                       ? "bg-blue-100 text-blue-600"
                       : "text-gray-700 hover:bg-gray-100"
                   }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            );
          })}

          {/* Collapsible settings items */}
          <div
            className={`block px-3 py-2 rounded-md transition-all duration-200 cursor-pointer ${
              location.pathname.startsWith("/dashboard/settings")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                setIsOpen((prev) => !prev);
                if (!isOpen) navigate("/dashboard/settings"); // inversed logic because of delayed update in state.
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
              {!isOpen ? <ChevronDown /> : <ChevronUp />}
            </div>

            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-8 mt-2 flex flex-col gap-1 space-y-2 overflow-hidden"
              >
                {settingsLinkItems.map((i) => (
                  <li
                    key={i.path}
                    onClick={() => {
                      // setIsOpen((prev) => !prev);
                      navigate(`/dashboard/settings/${i.path}`);
                    }}
                    className="text-gray-600 hover:text-blue-600 hover:underline cursor-pointer"
                  >
                    {i.label}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {user?.role !== "coach" && (
            <NavLink
              to={"/coaches/new"}
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-100 active:bg-blue-100"
            >
              <UserPlus /> Become a Coach
            </NavLink>
          )}
        </nav>
      </div>

      {/* Logout */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
        onClick={handleLogout}
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}
