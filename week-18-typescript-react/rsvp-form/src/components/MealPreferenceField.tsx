import type { Guest } from "../models/guest";
import { MEALS } from "../models/meal";
import SelectField from "./SelectField";

interface MealPreferenceFieldsProps {
  values: Pick<Guest, "meal">;
  errors: Partial<Record<"meal", string>>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function MealPreferenceField({
  values,
  errors,
  onChange,
}: MealPreferenceFieldsProps) {
  return (
    <>
      <SelectField
        label="Meal Preference"
        name="meal"
        value={values.meal}
        onChange={onChange}
        error={errors.meal}
        options={MEALS}
      />
    </>
  );
}
