// Attendancefield.tsx
import type { GuestFormEvent } from "../hooks/useGuestForm";
import type { FormErrors } from "../models/errors";
import type { GuestFormValues } from "../models/guest";
import CheckboxField from "./CheckboxField";

interface AttendanceFieldProps {
  values: GuestFormValues;
  errors: FormErrors;
  onChange: (e: GuestFormEvent) => void;
}

export default function AttendanceField({
  values,
  errors,
  onChange,
}: AttendanceFieldProps) {
  return (
    <div className="w-full grid grid-cols-1 gap-4 justify-items-center">
      <CheckboxField
        label="Attending?"
        name="attending"
        checked={values.attending}
        onChange={onChange}
        error={errors.attending}
      />
    </div>
  );
}
