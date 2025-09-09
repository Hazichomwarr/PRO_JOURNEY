import { CATEGORIES, type GuestFormValues } from "../models/guest";
import RadioField from "./RadioField";

interface CategoryFieldProps {
  values: GuestFormValues;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
