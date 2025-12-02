// store/coachStore.ts
import { create } from "zustand";
import axiosClient from "../lib/axiosClient";

interface CoachStoreState {
  coachId: string | null;
  fetchCoachId: () => Promise<void>;
  clearCoachId: () => void;
}

export const useCoachStore = create<CoachStoreState>((set) => ({
  coachId: localStorage.getItem("coachId"), //hydration on store creation

  fetchCoachId: async () => {
    const cached = localStorage.getItem("coachId");
    if (cached) return set({ coachId: cached });

    try {
      const res = await axiosClient("/coaches/by-user");
      const id = res.data.coachId;
      localStorage.setItem("coachId", id);
      set({ coachId: id });
    } catch {
      console.log("Error fetching coachId");
    }
  },

  clearCoachId: () => {
    localStorage.removeItem("coachId");
    set({ coachId: null });
  },
}));
