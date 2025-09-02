import type React from "react";
import type { Guest } from "../models/guest";
import InputField from "./InputField";

interface ContactInfoFieldsProps {
  values: Pick<Guest, "name" | "email">;
  errors: Partial<Record<"name" | "email", string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactInfoFields({
  values,
  errors,
  onChange,
}: ContactInfoFieldsProps) {
  return (
    <>
      <InputField
        label="Name"
        name="name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
      />

      <InputField
        label="Email"
        name="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />
    </>
  );
}
