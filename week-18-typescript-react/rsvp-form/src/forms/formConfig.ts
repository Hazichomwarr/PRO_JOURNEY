import type { FormValues } from "../models/guest";
import type { FormErrors } from "../models/errors";

export const formInitialValues: FormValues = {
  name: "",
  email: "",
  attending: true,
  meal: "chicken",
};

export function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.includes("@") && !values.email.includes("."))
    errors.email = "Valid email is required.";

  return errors;
}
