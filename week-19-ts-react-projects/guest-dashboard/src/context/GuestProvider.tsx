import { GuestContext, type GuestContextType } from "./GuestContext";
import type { Guest } from "../models/guest";
import { useEffect, useState, type ReactNode } from "react";
import { MOCK_DATA } from "../utils/mockData";

export default function GuestProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem("guests");
    return saved ? JSON.parse(saved) : MOCK_DATA;
  });

  useEffect(() => {
    localStorage.setItem("guests", JSON.stringify(guests));
  }, [guests]);

  function addGuest(guest: Guest) {
    setGuests((prev) => [...prev, guest]);
  }

  function updateGuest(updated: Guest) {
    setGuests((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  }

  function removeGuest(id: number) {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  const value: GuestContextType = {
    guests,
    setGuests,
    addGuest,
    updateGuest,
    removeGuest,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
}
