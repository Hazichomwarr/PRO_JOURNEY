import { useContext } from "react";
import { GuestContext, type GuestContextType } from "./GuestContext";

export function useGuestContext(): GuestContextType {
  const ctx = useContext(GuestContext);
  if (!ctx)
    throw new Error("useGuestContext must be used inside GuestProvider");
  return ctx;
}
