// components/layout/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { JSX } from "react";

export default function ProtectedRouted({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return !isAuthenticated ? <Navigate to="/login" replace /> : children;
}
