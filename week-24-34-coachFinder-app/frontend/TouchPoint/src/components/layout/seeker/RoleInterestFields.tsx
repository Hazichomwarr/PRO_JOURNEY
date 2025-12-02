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
        label={
          values.role === "coach"
            ? "Tell us how you want to help others?"
            : "Tell us in which area(s) you need help from?"
        }
        placeholder={
          values.role === "coach"
            ? "Ex: I want to help people in..."
            : "Ex: I want to learn... I need help in..."
        }
      />

      {/* InterestMultiSelect here (coming soon) */}
    </div>
  );
}
