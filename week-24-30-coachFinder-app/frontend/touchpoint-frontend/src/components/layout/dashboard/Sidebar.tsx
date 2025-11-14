//components/layout/dashboard/Sidebar.tsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

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

// import { NavLink, Outlet } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuthStore } from "../../../store/authStore";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);
//   const logout = useAuthStore((s) => s.logout);

//   const navLinks = [
//     { to: "/dashboard", label: "Overview", icon: "🏠" },
//     { to: "/dashboard/find", label: "Find Coach", icon: "🔍" },
//     { to: "/dashboard/messages", label: "Messages", icon: "💬" },
//     { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
//   ];

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-50">
//       {/* ---------- SIDEBAR (DESKTOP) ---------- */}
//       <aside className="hidden md:flex w-64 bg-white border-r flex-col">
//         <h2 className="text-xl font-semibold p-6 border-b">Dashboard</h2>

//         <nav className="flex-1 p-4 space-y-2">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-2 px-3 py-2 rounded-lg transition
//                 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`
//               }
//             >
//               <span>{link.icon}</span>
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>

//         <button
//           onClick={logout}
//           className="m-4 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* ---------- MOBILE HEADER ---------- */}
//       <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b p-4 flex items-center justify-between z-20">
//         <h2 className="text-lg font-semibold">Dashboard</h2>
//         <button onClick={() => setOpen(true)}>
//           <Menu size={26} />
//         </button>
//       </header>

//       {/* ---------- MOBILE SIDEBAR DRAWER ---------- */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               className="fixed inset-0 bg-black/40 z-30"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setOpen(false)}
//             />

//             {/* Drawer */}
//             <motion.aside
//               className="fixed top-0 left-0 bottom-0 w-64 bg-white z-40 p-6 flex flex-col"
//               initial={{ x: -200 }}
//               animate={{ x: 0 }}
//               exit={{ x: -200 }}
//               transition={{ type: "spring", stiffness: 200, damping: 22 }}
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-xl font-semibold">Menu</h2>
//                 <button onClick={() => setOpen(false)}>
//                   <X size={24} />
//                 </button>
//               </div>

//               <nav className="flex-1 space-y-4">
//                 {navLinks.map((link) => (
//                   <NavLink
//                     key={link.to}
//                     to={link.to}
//                     onClick={() => setOpen(false)}
//                     className={({ isActive }) =>
//                       `block px-3 py-2 rounded-lg transition
//                       ${
//                         isActive
//                           ? "bg-blue-600 text-white"
//                           : "hover:bg-gray-100"
//                       }`
//                     }
//                   >
//                     {link.icon} {link.label}
//                   </NavLink>
//                 ))}
//               </nav>

//               <button
//                 onClick={logout}
//                 className="mt-6 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
//               >
//                 Logout
//               </button>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ---------- MAIN CONTENT ----------
//       <main className="flex-1 overflow-y-auto md:ml-0 p-6 pt-20 md:pt-6">
//         <Outlet />
//       </main> */}
//     </div>
//   );
// }
