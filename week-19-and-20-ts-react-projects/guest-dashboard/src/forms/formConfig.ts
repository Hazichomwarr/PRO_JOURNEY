// forms/formConfig.ts
import type { FormErrors } from "../models/errors";
import type { GuestFormValues } from "../models/guest";

export const formInitialValues: GuestFormValues = {
  name: "",
  email: "",
  phone: "",
  attending: true,
  meal: "Chicken",
  category: "HR",
};

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/) || [];
  return [parts[1], parts[2], parts[3]].filter(Boolean).join("-");
}

export function validateForm(values: GuestFormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email.";
  }
  // 🔑 Extract digits only for validation
  const digitsOnly = values.phone.replace(/\D/g, "");

  if (digitsOnly.length !== 10) {
    errors.phone = "Phone must be 10 digits.";
  }
  if (values.attending === null || values.attending === undefined) {
    errors.attending = "Please confirm if you're attending.";
  }

  return errors;
}
