//  CategoryField.tsx
import type { GuestFormEvent } from "../hooks/useGuestForm";
import { CATEGORIES, type GuestFormValues } from "../models/guest";
import RadioField from "./RadioField";

interface CategoryFieldProps {
  values: Pick<GuestFormValues, "category">; //narrow down the type here
  onChange: (e: GuestFormEvent) => void;
}

export default function CategoryField({
  values,
  onChange,
}: CategoryFieldProps) {
  return (
    <RadioField
      name="category"
      value={values.category}
      categories={CATEGORIES}
      onChange={onChange}
    />
  );
}
