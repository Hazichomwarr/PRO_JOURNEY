export type User = {
  id?: string;
  _id?: string; // DB id
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  image?: string;
  phone?: string;
  city?: string;
  state?: string;
};

export type UserPublic = Omit<User, "password" | "confirmPassword"> & {
  id: string;
};

import { create } from "zustand";

interface UserState {
  user: UserPublic | null;
  setUser: (u: UserPublic) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clearUser: () => set({ user: null }),
}));
