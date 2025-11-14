//components/SessionWatcher.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { usePageTracker } from "../store/pageTracker";

export default function SessionWatcher() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  const recordVisit = usePageTracker((s) => s.recordVisit);
  const { pathname } = useLocation();

  useEffect(() => {
    recordVisit(pathname);
  }, [pathname, recordVisit]);

  return null;
}
