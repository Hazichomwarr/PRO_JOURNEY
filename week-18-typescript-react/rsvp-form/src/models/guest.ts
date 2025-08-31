import type { Meal } from "./meal";

export interface Guest {
  id: number;
  name: string;
  attending: boolean;
  email: string;
  meal: Meal;
}
