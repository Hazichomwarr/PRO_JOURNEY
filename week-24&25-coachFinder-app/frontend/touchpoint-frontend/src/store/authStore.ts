//store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../models/user";

interface Store {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}
export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({ user, accessToken: token, isAuthenticated: true }),

      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),

      setUser: (user) => set({ user }),
    }),

    { name: "auth-storage" }
  )
);
