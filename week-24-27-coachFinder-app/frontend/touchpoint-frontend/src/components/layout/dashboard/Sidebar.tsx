//components/layout/dashboard/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  Home,
  Settings,
  MessageCircle,
  ScanSearch,
  LogOut,
} from "lucide-react";
import useLogout from "../../../hooks/useLogout";

export default function Sidebar() {
  const { handleLogout } = useLogout();

  const links = [
    {
      to: "/dashboard/overview",
      label: "Overview",
      icon: <Home size={18} />,
    },
    {
      to: "/dashboard/find",
      label: "Find a coach",
      icon: <ScanSearch size={18} />,
    },
    {
      to: "/dashboard/messages",
      label: "Messages",
      icon: <MessageCircle size={18} />,
    },
    {
      to: "/dashboard/settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];
  return (
    <div className=" flex flex-col justify-between p-4 space-y-6 w-64 h-screen bg-white shadow-md">
      <div>
        <h1 className="text-xl font-bold mb-8 text-blue-600">TouchPoint</h1>
        <nav className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
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
