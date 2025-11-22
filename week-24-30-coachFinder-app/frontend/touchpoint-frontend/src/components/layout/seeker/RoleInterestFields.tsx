import { UserFormEvent } from "../../../hooks/useRegisterForm";
import { UserFormErrors, UserFormValues } from "../../../models/user";
import TextAreaField from "../../ui/TextAreaField";
import SelectInputfield from "./SelectInputfield";

interface Props {
  values: UserFormValues;
  errors: UserFormErrors;
  onchange: (field: keyof UserFormValues) => (e: UserFormEvent) => void;
}

export default function RoleInterestFields({
  values,
  errors,
  onchange,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-3">
      <SelectInputfield
        value={values.role}
        changeFn={onchange("role")}
        error={errors.role}
        label="How do you want to use TouchPoint?"
      />
      <TextAreaField
        value={values.bio}
        error={errors.bio}
        changeFn={onchange("bio")}
        placeholder="Tell us about yourself (How can we help you?)..."
      />

      {/* InterestMultiSelect here (coming soon) */}
    </div>
  );
}
