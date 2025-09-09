//context/GuestProvider.tsx
import {
  GuestContext,
  type Flash,
  type GuestContextType,
} from "./GuestContext";
import type { Guest } from "../models/guest";
import { useEffect, useState, type ReactNode, useMemo } from "react";

export default function GuestProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem("guests");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(""); //ex: "HR"
  const [sortBy, setSortBy] = useState<"name" | "email" | "category" | null>(
    null
  );

  // flashMessage state
  const [flash, setFlash] = useState<Flash | null>(null);

  useEffect(() => {
    localStorage.setItem("guests", JSON.stringify(guests));
  }, [guests]);

  function addGuest(guest: Guest) {
    setGuests((prev) => [...prev, guest]);
    setFlash({ message: "Guest added successfully!", type: "success" });
  }

  function updateGuest(updated: Guest) {
    setGuests((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setFlash({ message: "Guest updated successfully!", type: "success" });
  }

  function removeGuest(id: number) {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  // processedGuests = search -> filter -> sort
  const processedGuests = useMemo(() => {
    let result = [...guests];

    //search(name/email/phone)
    if (searchQuery) {
      result = result.filter((g) =>
        [g.name, g.email, g.phone].some((field) =>
          field?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        )
      );
    }
    //Filter by Category
    if (filterCategory) {
      result = result.filter((g) => g.category === filterCategory);
    }
    //Sorting
    if (sortBy) {
      result = [...result].sort((a, b) => {
        const valA = (a[sortBy] ?? "").toString().toLowerCase();
        const valB = (b[sortBy] ?? "").toString().toLowerCase();
        return valA.localeCompare(valB);
      });
    }
    return result;
  }, [guests, searchQuery, filterCategory, sortBy]);

  const value: GuestContextType = {
    guests,
    setGuests,
    addGuest,
    updateGuest,
    removeGuest,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    processedGuests,
    flash,
    setFlash,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
}
