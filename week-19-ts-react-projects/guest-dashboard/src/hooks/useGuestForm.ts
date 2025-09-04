import React, { useState } from "react";

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void;
}

export default function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let validationErrors: Partial<Record<keyof T, string>> = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
    }

    if (!validate || Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      setValues(initialValues);
    }
  }

  return { values, errors, setErrors, handleChange, handleSubmit, setValues };
}
