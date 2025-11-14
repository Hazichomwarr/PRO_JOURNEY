//store/pageTracker.ts
import { create } from "zustand";

interface PageTrackerState {
  visits: Record<string, number>;
  recordVisit: (page: string) => void;
}

export const usePageTracker = create<PageTrackerState>((set) => ({
  visits: {},
  recordVisit: (page) =>
    set((state) => ({
      visits: { ...state.visits, [page]: (state.visits[page] || 0) + 1 },
    })),
}));
