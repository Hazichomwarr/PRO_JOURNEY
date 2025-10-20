// components/layout/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { JSX } from "react";

type Fnprops = {
  children: JSX.Element;
};

export default function ProtectedRouted({ children }: Fnprops) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
