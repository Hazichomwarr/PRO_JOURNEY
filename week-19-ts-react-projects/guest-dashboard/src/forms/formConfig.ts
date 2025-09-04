import type { FormErrors } from "../models/errors";
import type { Guest } from "../models/guest";

export const formInitialValues: Guest = {
  id: Date.now(),
  name: "",
  email: "",
  phone: "" as unknown as number,
  attending: true,
  meal: "Chicken",
  category: "HR",
};

export function validateForm(values: Guest): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.includes("@") && !values.email.includes(".")) {
    errors.email = "Valid email is required.";
  }
  if (typeof values.phone !== "number") errors.phone = "Invalid Phone number.";

  return errors;
}
