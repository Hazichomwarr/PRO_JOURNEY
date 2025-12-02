//components/layout/PublicRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // const isLoaded = useAuthStore((s) => s.isLoaded);

  // if (isLoaded) return <LoadingSpinner />;

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}
