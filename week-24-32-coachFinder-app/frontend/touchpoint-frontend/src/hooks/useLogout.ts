//hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function useLogout() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAuthenticated === true) {
      logout();
      setTimeout(() => navigate("/home"), 300); //with small delay
    }
  };

  return { handleLogout };
}
