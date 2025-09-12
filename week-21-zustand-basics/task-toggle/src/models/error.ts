import type { Task } from "./task";

export type TaskFormErrors = Partial<Record<Exclude<keyof Task, "id">, string>>;
