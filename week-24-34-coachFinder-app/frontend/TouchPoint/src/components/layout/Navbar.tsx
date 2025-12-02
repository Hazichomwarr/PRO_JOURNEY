//components/layout/Navbar.tsx
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import FlashRenderer from "../ui/FlashRenderer";
import { useState } from "react";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export type NavLinkItem = {
  to: string;
  label: string;
  auth: "any" | "auth" | "guest";
};

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home");
    setIsRequest(false);
  };

  const links: NavLinkItem[] = [
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
    <header>
      <DesktopNavbar
        setIsRequest={setIsRequest}
        filteredLinks={filteredLinks}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
      />

      <MobileNavbar
        setIsRequest={setIsRequest}
        filteredLinks={filteredLinks}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
      />

      <ConfirmLogoutModal
        isRequest={isRequest}
        setIsRequest={setIsRequest}
        onLogout={handleLogout}
      />

      <FlashRenderer />
    </header>
  );
}
