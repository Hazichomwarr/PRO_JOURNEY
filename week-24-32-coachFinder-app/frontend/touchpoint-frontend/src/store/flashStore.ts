//store/flashStore.ts
import { create } from "zustand";

interface FlashMessageData {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  position?: FlashPosition;
}

type FlashPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface FlashStoreState {
  flashes: FlashMessageData[];
  addFlash: (
    msg: string,
    type?: FlashMessageData["type"],
    duration?: number,
    position?: FlashPosition
  ) => void;
  removeFlash: (id: string) => void;
}

export const useFlashStore = create<FlashStoreState>((set) => ({
  flashes: [],

  addFlash: (message, type = "info", duration = 3000, position = "top-right") =>
    set((state) => ({
      flashes: [
        ...state.flashes,
        { id: crypto.randomUUID(), message, type, duration, position },
      ],
    })),

  removeFlash: (id) =>
    set((state) => ({
      flashes: state.flashes.filter((f) => f.id !== id),
    })),
}));
