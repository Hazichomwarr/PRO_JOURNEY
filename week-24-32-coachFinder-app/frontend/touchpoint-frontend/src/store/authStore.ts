//store/authStore.ts
import { create } from "zustand";
import { axiosClient, tokenService } from "../lib/axiosClient";
import { useFlashStore } from "./flashStore";
import { TypeRole, UserPublic } from "../models/user";

// ---- TYPES -----------------------------------------------------
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
  isAuthenticated: boolean;
  isLoaded: boolean;

  // Actions
  setAuth: (
    user: UserFromTokenPayload,
    userInfo: UserPublic,
    accessToken: string
  ) => void;

  setUser: (user: UserPublic) => void;
  clearUser: () => void;

  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  updateRole: (newRole: TypeRole) => void;
}

// ---- HELPER: Read CSRF Cookie ---------------------------------
function getCSRF() {
  const match = document.cookie.match(/csrfToken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// ---- STORE -----------------------------------------------------
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  userInfo: null,
  isLoaded: false,

  /**
   * Called when login/register succeeds.
   * We ONLY store user + userInfo in localStorage.
   * Access token is in-memory via tokenService.
   */
  setAuth: (user, userInfo, accessToken) => {
    // Store in memory only
    tokenService.setToken(accessToken);

    // Save user profiles to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    set({
      user,
      userInfo,
      isAuthenticated: true,
    });
  },

  /**
   * Logout:
   * - Tells backend to clear httpOnly refresh cookie
   * - Clears memory token
   * - Clears persisted localStorage user data
   */
  logout: async () => {
    try {
      await axiosClient.post("/auth/logout", null, { withCredentials: true });
    } catch (err) {
      console.warn("Logout warning", err);
    } finally {
      localStorage.clear(); // or should I write: localStorage.removeItem("user"); localStorage.removeItem("userInfo");

      // Clear memory token
      tokenService.setToken(null);

      set({
        user: null,
        userInfo: null,
        isAuthenticated: false,
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
    const user = localStorage.getItem("user");
    const userInfo = localStorage.getItem("userInfo");

    if (user) {
      set({
        user: JSON.parse(user),
        userInfo: userInfo ? JSON.parse(userInfo) : null,
        isAuthenticated: true,
        isLoaded: true,
      });
      /**
       * IMPORTANT:
       * axiosClient will automatically refresh the access token
       * once it encounters a 401 during startup or first API call.
       * We do NOT trigger refresh manually here.
       */
    } else {
      set({ isLoaded: true });
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
