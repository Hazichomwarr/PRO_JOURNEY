import type { Meal } from "./meal";

export interface Guest {
  id: number;
  name: string;
  attending: boolean | null;
  email: string;
  meal: Meal;
}

export type FormValues = Omit<Guest, "id">;
