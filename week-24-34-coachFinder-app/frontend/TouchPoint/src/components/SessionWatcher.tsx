//components/SessionWatcher.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { usePageTracker } from "../store/pageTracker";

const protectedPaths = [
  "/dashboard",
  "/profile",
  "/settings",
  "/messages",
  "/coach",
  "/sessions",
];

export default function SessionWatcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const recordVisit = usePageTracker((s) => s.recordVisit);

  useEffect(() => {
    recordVisit(pathname);
  }, [pathname]);

  useEffect(() => {
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isProtected && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [pathname, isAuthenticated]);

  return null;
}
