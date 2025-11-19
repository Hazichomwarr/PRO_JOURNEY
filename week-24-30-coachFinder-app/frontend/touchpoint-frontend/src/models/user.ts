//models/user.ts

export type TypeRole = "coach" | "buddy" | "seeker";

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
  dateBirth?: string;
  image?: string;
  interest?: string;
  role: TypeRole;
}

export type UserPublic = Partial<User>;

export type UserFormValues = Omit<User, "id">;

export type UserUpdateFields = Omit<
  User,
  "password" | "confirmPassword" | "id"
>;
