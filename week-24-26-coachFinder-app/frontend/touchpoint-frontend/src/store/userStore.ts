//store/userStore.ts
import { create } from "zustand";
import { User } from "../models/user";

export type UserPublic = Omit<User, "password" | "confirmPassword"> & {
  id: string;
};

interface UserState {
  user: UserPublic | null;
  setUser: (user: UserPublic) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
