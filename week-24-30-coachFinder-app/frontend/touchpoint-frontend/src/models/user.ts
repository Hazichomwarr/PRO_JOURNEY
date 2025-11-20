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
  image?: string | File | null | undefined;
  interests?: string[];
  role: TypeRole;
}

export type UserPublic = Partial<User>;

export type UserFormValues = Omit<User, "id">;

export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

export type UserUpdateFields = Omit<
  User,
  "password" | "confirmPassword" | "id"
>;
