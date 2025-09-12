//context/GuestContext.ts
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Guest } from "../models/guest";

export type Flash = {
  message: string;
  type?: "success" | "error" | "info";
};
export interface GuestContextType {
  guests: Guest[];
  setGuests: Dispatch<SetStateAction<Guest[]>>;
  addGuest: (guest: Guest) => void;
  updateGuest: (updated: Guest) => void;
  removeGuest: (id: string) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  filterCategory: string;
  setFilterCategory: (c: string) => void;

  sortBy: "name" | "email" | "category" | null;
  setSortBy: (s: "name" | "email" | "category" | null) => void;

  processedGuests: Guest[];

  flash?: Flash | null;
  setFlash: Dispatch<SetStateAction<Flash | null>>;
}

export const GuestContext = createContext<GuestContextType | undefined>(
  undefined
);
