import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind + conditional classes together
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}
