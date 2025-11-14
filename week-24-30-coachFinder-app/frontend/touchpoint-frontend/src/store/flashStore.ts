import { create } from "zustand";

interface FlashMessageData {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
}

interface FlashStoreState {
  flashes: FlashMessageData[];
  addFlash: (msg: string, type?: FlashMessageData["type"]) => void;
  removeFlash: (id: number) => void;
}

export const useFlashStore = create<FlashStoreState>((set) => ({
  flashes: [],

  addFlash: (message, type = "info") =>
    set((state) => ({
      flashes: [...state.flashes, { id: Date.now(), message, type }],
    })),

  removeFlash: (id) =>
    set((state) => ({
      flashes: state.flashes.filter((f) => f.id !== id),
    })),
}));
