import { create } from "zustand";
import axiosClient from "../lib/axiosClient";

interface CoachStoreState {
  coachId: string | null;
  SetCoachId: () => Promise<void>;
  clearCoachId: () => void;
}

export const useCoachStore = create<CoachStoreState>((set) => ({
  coachId: null,

  SetCoachId: async () => {
    try {
      const res = await axiosClient("/coaches/by-user");
      localStorage.setItem("coachId", res.data.coachId);
      set({ coachId: res.data.coachId });
    } catch (err) {
      console.log("error finding coach id");
    }
  },

  clearCoachId: () => {
    localStorage.removeItem("coachId");
    set({ coachId: null });
  },
}));
