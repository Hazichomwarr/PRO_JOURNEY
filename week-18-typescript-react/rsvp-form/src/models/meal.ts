export const MEALS = ["chicken", "beef", "vegetarian"] as const;

export type Meal = (typeof MEALS)[number];
