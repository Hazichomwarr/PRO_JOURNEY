import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Guest } from "../models/guest";

export interface GuestContextType {
  guests: Guest[];
  setGuests: Dispatch<SetStateAction<Guest[]>>;
  addGuest: (guest: Guest) => void;
  updateGuest: (updated: Guest) => void;
  removeGuest: (id: number) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  filterCategory: string;
  setFilterCategory: (c: string) => void;

  sortBy: "name" | "email" | "category" | null;
  setSortBy: (s: "name" | "email" | "category" | null) => void;

  processedGuests: Guest[];
}

export const GuestContext = createContext<GuestContextType | undefined>(
  undefined
);
