import { UserFormErrors, UserFormValues } from "../models/user";
import { LoginErrors, LoginState } from "../pages/Login";

export const ALL_INTERESTS = [
  "Cooking",
  "Fitness",
  "Tech",
  "Reading",
  "Running",
  "Cars",
  "Language Learning",
  "Parenting",
  "Health",
  "Money Management",
  "Gardening",
];

function hasNumber(val: string): boolean {
  const numbers = "0123456789";
  for (let num of numbers) {
    if (val.includes(num)) return true;
  }
  return false;
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/) || [];
  return [parts[1], parts[2], parts[3]].filter(Boolean).join("-");
}

export function validateForm(values: UserFormValues): UserFormErrors {
  const errors: UserFormErrors = {};
  //firstname error check
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (hasNumber(values.firstName) === true)
    errors.city = "Please enter a valid first name.";

  //Lastname has to be string
  if (typeof values.lastName !== "string")
    errors.lastName = "Please enter a valid Last Name.";

  //Email error check
  if (!values.email.trim()) errors.email = "Email is a required field.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email.";
  }

  //   // 🔑 Extract digits only for validation
  //   const digitsOnly = values.phone?.replace(/\D/g, "");

  //   if (digitsOnly?.length !== 10) {
  //     errors.phone = "Phone must be 10 digits.";
  //   }

  //City/town error check
  if (!values.city.trim()) errors.city = "City(Town) is a required field.";
  if (typeof values.city !== "string")
    errors.city = "Please enter a valid city name.";

  //State/Country error check
  if (!values.state.trim())
    errors.state = "State(Country) is a required field.";
  if (typeof values.state !== "string")
    errors.city = "Please enter a valid state name.";

  //DOB error check
  if (!values.birthDate) errors.birthDate = "Date of birth is required.";

  //Role error check
  if (values.role === "") errors.role = "Choose a role";

  //Password erros check
  if (values.password.length < 10)
    errors.password = "Password must be at least 10 characters.";

  if (!/[A-Z]/.test(values.password))
    errors.password = "Must include at least 1 uppercase letter.";
  if (!/[0-9]/.test(values.password))
    errors.password = "Must include at least 1 number.";

  //confirmpassword match
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
}

export function validateLoginForm(values: LoginState): LoginErrors {
  let errors: LoginErrors = {};

  //Email error check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email.";
  }

  //Password erros check
  if (values.password.length < 8 || !values.password)
    errors.password = "Incorrect password.";

  return errors;
}

export function normalizeImageSrc(img?: string | File | null) {
  if (!img) return "/avatar-placeholder.png";

  if (img instanceof File) {
    return URL.createObjectURL(img);
  }
  return img; // already a string
}
