//store/pageTracker.ts
import { create } from "zustand";

interface PageTrackerState {
  visits: Record<string, number>;
  history: Array<{ page: string; at: number }>;
  recordVisit: (page: string) => void;
  resetVisit: () => void;
}

export const usePageTracker = create<PageTrackerState>((set) => ({
  visits: {},
  history: [],

  recordVisit: (page) =>
    set((state) => ({
      visits: {
        ...state.visits,
        [page]: (state.visits[page] || 0) + 1,
      },
      history: [...state.history, { page, at: Date.now() }].slice(-200), // keep last 200 entries to prevent memory bloat
    })),

  resetVisit: () => set({ visits: {}, history: [] }),
}));
