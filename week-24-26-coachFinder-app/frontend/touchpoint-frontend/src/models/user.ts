//models/user.ts

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
  role: string;
}

// type roleType = "coach" | "user";

export type UserFormValues = Omit<User, "id">;

export type UserUpdateFields = Omit<
  User,
  "password" | "confirmPassword" | "id"
>;
