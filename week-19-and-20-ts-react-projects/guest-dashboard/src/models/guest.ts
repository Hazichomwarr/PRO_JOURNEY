// models/guest.ts
export const CATEGORIES = ["HR", "IT", "Sales"];
export type category = (typeof CATEGORIES)[number];

export const MEALS = ["Chicken", "Beef", "Vegetarian"] as const;
export type meal = (typeof MEALS)[number];

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  category: category;
  meal: meal;
}

export type GuestFormValues = Omit<Guest, "id">;
