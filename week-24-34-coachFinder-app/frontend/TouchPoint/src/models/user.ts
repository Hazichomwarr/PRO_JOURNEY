//models/user.ts

export type TypeRole = "coach" | "buddy" | "seeker" | string;

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  email: string;
  city: string;
  state: string;
  birthDate?: string;
  image?: File | string | null;
  interests?: string[];
  role: TypeRole;
  bio?: string;
}

export type UserPublic = Partial<User>;

export type UserFormValues = Omit<User, "id">;

type BaseErrors = Partial<
  Record<Exclude<keyof UserFormValues, "image">, string>
>;

export type UserFormErrors = BaseErrors & {
  image?: string;
};

export type UserUpdateFields = Omit<
  User,
  "password" | "confirmPassword" | "id"
>;
