export type category = "HR" | "IT" | "Sales";
export type meal = "Chicken" | "Beef" | "vegetarian";
export interface Guest {
  id: number;
  name: string;
  email: string;
  phone: number;
  attending: boolean;
  category: category;
  meal: meal;
}
