import { create } from "zustand";

interface FlashMessageData {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

interface FlashStoreState {
  flashes: FlashMessageData[];
  addFlash: (
    msg: string,
    type?: FlashMessageData["type"],
    duration?: number
  ) => void;
  removeFlash: (id: number) => void;
}

export const useFlashStore = create<FlashStoreState>((set) => ({
  flashes: [],

  addFlash: (message, type = "info", duration = 3000) =>
    set((state) => ({
      flashes: [...state.flashes, { id: Date.now(), message, type, duration }],
    })),

  removeFlash: (id) =>
    set((state) => ({
      flashes: state.flashes.filter((f) => f.id !== id),
    })),
}));
