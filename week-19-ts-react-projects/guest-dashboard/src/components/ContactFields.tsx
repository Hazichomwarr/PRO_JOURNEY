import type React from "react";
import type { FormErrors } from "../models/errors";
import type { GuestFormValues } from "../models/guest";
import InputField from "./InputField";

interface ContactFieldsProps {
  values: GuestFormValues;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactFields({
  values,
  errors,
  onChange,
}: ContactFieldsProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-2 justify-items-center">
      <InputField
        label="Name"
        name="name"
        value={values.name}
        error={errors.name}
        onChange={onChange}
      />
      <InputField
        label="Email"
        name="email"
        value={values.email}
        error={errors.email}
        onChange={onChange}
      />
      <InputField
        label="Phone"
        name="phone"
        value={values.phone}
        error={errors.phone}
        onChange={onChange}
      />
    </div>
  );
}
