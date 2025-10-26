import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}
