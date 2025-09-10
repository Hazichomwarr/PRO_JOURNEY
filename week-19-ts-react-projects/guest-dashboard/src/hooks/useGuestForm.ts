// hooks/useGuestForm.ts
import React, { useState } from "react";
import type { FormErrors } from "../models/errors";
import { useNavigate } from "react-router-dom";
import { formatPhone } from "../forms/formConfig";

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void;
}

export type GuestFormEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export default function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigation = useNavigate();

  function handleChange(e: GuestFormEvent) {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newValue: string | boolean = value;
    if (name === "phone") newValue = formatPhone(value);

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let validationErrors: FormErrors = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
    }

    if (!validate || Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      setValues(initialValues);
      navigation("/");
    }
  }

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    setValues,
  };
}
