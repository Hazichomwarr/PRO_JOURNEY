//store/authStore.ts
import { create } from "zustand";
import { axiosClient, refreshClient } from "../lib/axiosClient";
import { useFlashStore } from "./flashStore";
import { TypeRole, UserPublic } from "../models/user";

export interface UserFromTokenPayload {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: UserFromTokenPayload | null;
  userInfo: UserPublic | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  expiresIn: number | null;
  isLoaded: boolean;

  setAuth: (
    user: UserFromTokenPayload,
    userInfo: UserPublic,
    access: string,
    refresh: string
  ) => void;

  setUser: (user: UserPublic) => void;
  clearUser: () => void;

  logout: () => void;
  restoreSession: () => Promise<void>;
  updateRole: (newRole: TypeRole) => void;
  checkAccessExpiry: () => void;
  refreshAccessToken: () => Promise<boolean>;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  userInfo: null,
  expiresIn: null,
  isLoaded: false,

  //When login/register succeeds
  setAuth: (user, userInfo, accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    set({
      user,
      userInfo,
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
        userInfo: null,
      });

      //Reset page tracker store
      useFlashStore.getState().addFlash("You have logged out.", "info");
    }
  },

  //set user info
  setUser: (infos) => {
    set({ userInfo: infos });
    localStorage.setItem("userInfo", JSON.stringify(infos));
  },

  //Clear user info
  clearUser: () => {
    set({ userInfo: null });
    localStorage.removeItem("userInfo");
  },

  //Auto-hydrate state from localStorage
  restoreSession: async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");
    const userInfo = localStorage.getItem("userInfo");

    if (accessToken && refreshToken && user) {
      set({
        accessToken,
        refreshToken,
        user: JSON.parse(user),
        userInfo: userInfo ? JSON.parse(userInfo) : null,
        isAuthenticated: true,
        isLoaded: true,
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
    if (!decoded) {
      console.warn("Invalid access token payload");
      get().logout();
      return;
    }

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

      // 1. Persist new token
      localStorage.setItem("accessToken", newAccess);

      // 2. Decode payload to extract exp
      const [, payload] = newAccess.split(".");
      let decoded;
      try {
        decoded = JSON.parse(atob(payload));
      } catch (e) {
        console.warn("Failed decoding refreshed access token:", e);
        get().logout();
        return false;
      }

      // 3. Compute how long until expiry
      const expiresAtMs = decoded.exp * 1000;
      const now = Date.now();
      const expiresInMs = expiresAtMs - now;

      // 4. Update store with new access token + expiry time
      set({
        accessToken: newAccess,
        isAuthenticated: true,
        expiresIn: expiresInMs,
      });

      // 5. Schedule the next refresh (minus 1 minute buffer)
      const delay = Math.max(expiresInMs - 60_000, 0);
      setTimeout(() => get().refreshAccessToken(), delay);

      console.log("Access token refreshed successfully!");
      return true;
    } catch (err) {
      console.warn("Failed to refresh token:", err);
      get().logout();
      return false;
    }
  },

  //Update Role (seeker -> coach)
  updateRole: (newRole: TypeRole) => {
    const currentUser = get().user;
    const currentUserInfo = get().userInfo;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, role: newRole };
    const updatedUserInfo = { ...currentUserInfo, role: newRole };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

    set({ user: updatedUser, userInfo: updatedUserInfo });

    console.log("Role updated to:", newRole);
  },
}));
