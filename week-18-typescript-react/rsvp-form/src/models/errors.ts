import type { Guest } from "./guest";

export type FormErrors = Partial<Record<Exclude<keyof Guest, "id">, string>>;
