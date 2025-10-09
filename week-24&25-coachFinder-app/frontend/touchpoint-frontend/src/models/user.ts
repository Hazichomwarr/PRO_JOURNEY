//models/user.ts
export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  email: string;
  address: { city: string; state: string };
  dateBirth?: string;
  image?: string;
  interest?: string;
  role: string;
}
