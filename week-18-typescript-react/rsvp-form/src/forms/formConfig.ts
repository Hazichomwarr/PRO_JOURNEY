import type { Guest } from "../models/guest";
import type { FormErrors as validationErrors } from "../models/errors";

export const formInitialValues: Guest = {
  id: Date.now(),
  name: "",
  email: "",
  attending: null as unknown as boolean,
  meal: "chicken",
};

export function validateForm(values: Guest): validationErrors<Guest> {
  const errors: validationErrors<Guest> = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.includes("@") && !values.email.includes("."))
    errors.email = "Valid email is required.";

  return errors;
}
