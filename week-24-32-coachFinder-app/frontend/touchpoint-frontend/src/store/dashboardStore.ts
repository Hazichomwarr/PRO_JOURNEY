// store/dashboardStore.ts
import { create } from "zustand";
import { axiosClient } from "../lib/axiosClient";

type Stats = {
  totalCoaches?: number;
  sessionsBooked?: number;
  satisfaction?: number;
  activeClients?: number;
  pendingRequests?: number;
  totalReviews?: number;
};

type DashboardState = {
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  fetchStats: (role: string) => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  loading: false,
  error: null,

  fetchStats: async (role: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get(`/dashboard/stats?role=${role}`);
      set({ stats: res.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to load dashboard stats",
        loading: false,
      });
    }
  },
}));
