// forms/formConfig.ts
import type { FormErrors } from "../models/errors";
import type { GuestFormValues } from "../models/guest";

export const formInitialValues: GuestFormValues = {
  name: "",
  email: "",
  phone: "",
  attending: false,
  meal: "Chicken",
  category: "HR",
};

export function validateForm(values: GuestFormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!/^\d{4,15}$/.test(values.phone)) {
    errors.phone = "Phone must be 4 digits."; //min 4 digits for now
  }
  if (values.attending === null || values.attending === undefined) {
    errors.attending = "Please confirm if you're attending.";
  }

  return errors;
}
