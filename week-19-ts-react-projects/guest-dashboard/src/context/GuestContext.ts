import { createContext } from "react";
import type { Guest } from "../models/guest";

export interface GuestContextType {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
  addGuest: (guest: Guest) => void;
  updateGuest: (updated: Guest) => void;
  removeGuest: (id: number) => void;
}

export const GuestContext = createContext<GuestContextType | undefined>(
  undefined
);
