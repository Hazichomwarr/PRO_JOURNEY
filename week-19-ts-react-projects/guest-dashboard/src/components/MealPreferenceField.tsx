import type { GuestFormEvent } from "../hooks/useGuestForm";
import type { FormErrors } from "../models/errors";
import { MEALS, type GuestFormValues } from "../models/guest";
import SelectField from "./SelectField";

interface MealPreferenceFieldProps {
  values: GuestFormValues;
  errors: FormErrors;
  onChange: (e: GuestFormEvent) => void;
}

export default function MealPreferenceField({
  values,
  errors,
  onChange,
}: MealPreferenceFieldProps) {
  return (
    <SelectField
      label="Meal Options"
      name="meal"
      value={values.meal}
      options={MEALS}
      onChange={onChange}
      error={errors.meal}
    />
  );
}
