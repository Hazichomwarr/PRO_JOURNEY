// export interface FormErrors<T> {
//   id?: number;
//   name?: string;
//   email?: string;
//   meal?: string;
//   attending?: boolean | null;
// }

import type { Guest } from "./guest";

export type FormErrors = Partial<Record<Exclude<keyof Guest, "id">, string>>;
