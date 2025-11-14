//store/authStore.ts
import { create } from "zustand";
import axiosClient from "../lib/axiosClient";
import refreshClient from "../lib/axiosClient";
import { usePageTracker } from "./pageTracker";
import { useFlashStore } from "./flashStore";

interface UserFromTokenPayload {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: UserFromTokenPayload | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setAuth: (
    user: UserFromTokenPayload,
    access: string,
    refresh: string
  ) => void;
  logout: () => void;
  restoreSession: () => Promise<void>;
  updateRole: (newRole: string) => void;
  checkAccessExpiry: () => void;
  refreshAccessToken: () => Promise<boolean>;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  //When login/register succeeds
  setAuth: (user, accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  //logout handler
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await axiosClient.delete("/auth/logout", {
          data: { token: refreshToken },
        });
      }
    } catch (err) {
      console.warn("Logout warning", err);
    } finally {
      localStorage.clear();

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });

      //Reset page tracker store
      useFlashStore.getState().addFlash("You have logged out.", "info");
    }
  },

  //Auto-hydrate state from localStorage
  restoreSession: async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (accessToken && refreshToken && user) {
      set({
        accessToken,
        refreshToken,
        user: JSON.parse(user),
        isAuthenticated: true,
      });

      // Check if access token is expired; refresh if needed
      get().checkAccessExpiry();
    }
  },

  //Decode and check access expiry
  checkAccessExpiry: () => {
    const { accessToken } = get();
    if (!accessToken) return;

    const [, payload] = accessToken.split(".");
    const decoded = JSON.parse(atob(payload));
    // const expiryMS = decoded.exp * 1000 - Date.now() - 60000; //1 min before expiry

    // setTimeout(() => get().refreshAccessToken(), expiryMS);
    const delay = Math.max(decoded.exp * 1000 - Date.now() - 60000, 0);
    setTimeout(() => get().refreshAccessToken(), delay);
  },

  //refresh token logic
  refreshAccessToken: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      get().logout();
      return false;
    }

    try {
      const res = await refreshClient.post("/auth/refresh", { refreshToken });
      const { accessToken: newAccess } = res.data;

      localStorage.setItem("accessToken", newAccess);
      set({ accessToken: newAccess, isAuthenticated: true });
      console.log("Access token refreshed successfully!");

      return true;
    } catch (err) {
      console.warn("Failed to refresh token:", err);
      get().logout();
      return false;
    }
  },

  //Update Role (seeker -> coach)
  updateRole: (newRole) => {
    const current = get().user;
    if (!current) return;

    const updatedUser = { ...current, role: newRole };
    set({ user: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));

    console.log("Role updated to:", newRole);
  },
}));
