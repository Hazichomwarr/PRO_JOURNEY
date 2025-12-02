//components/layout/MobileNavbar.tsx
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLinkItem } from "./Navbar";
import { navLinkClass } from "../../utils/navLinkClass";
import { useAuthStore } from "../../store/authStore";

interface Props {
  filteredLinks: NavLinkItem[];
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNavbar({
  filteredLinks,
  mobileOpen,
  setMobileOpen,
  setIsRequest,
}: Props) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <>
      {mobileOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-gray-700 text-white px-6 py-4 flex flex-col gap-4 shadow-lg"
          >
            {filteredLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  navLinkClass(isActive) + " block text-lg py-2"
                }
              >
                {item.label}
              </NavLink>
            ))}

            {!isAuthenticated ? (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-lg py-2"
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsRequest(true);
                }}
                className="text-left block py-2"
              >
                Logout
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
