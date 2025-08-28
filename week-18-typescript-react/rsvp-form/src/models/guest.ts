export interface Guest {
  id: number;
  name: string;
  attending: boolean;
  email: string;
  meal: "chicken" | "beef" | "vegetarian"; //union type for stricter control
}
