// components/layout/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { JSX } from "react";
import { Loader2 } from "lucide-react";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ProtectedRouted({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // const isLoaded = useAuthStore((s) => s.isLoaded);

  // if (isLoaded) return <LoadingSpinner />;
  return !isAuthenticated ? <Navigate to="/login" replace /> : children;
}
