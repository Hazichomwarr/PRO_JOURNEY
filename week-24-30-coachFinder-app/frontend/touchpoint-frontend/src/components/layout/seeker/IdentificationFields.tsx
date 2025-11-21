import { UserFormEvent } from "../../../hooks/useRegisterForm";
import { UserFormErrors, UserFormValues } from "../../../models/user";
import InputField from "../../ui/InputField";

interface Props {
  values: UserFormValues;
  errors: UserFormErrors;
  onchange: (field: keyof UserFormValues) => (e: UserFormEvent) => void;
}

export default function IdentificationFields({
  values,
  errors,
  onchange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <InputField
        value={values.password}
        type="password"
        changeFn={onchange("password")}
        placeholder="Password"
        error={errors.password}
        name="password"
      />
      <InputField
        value={values.confirmPassword}
        type="password"
        changeFn={onchange("confirmPassword")}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
        name="confirmPassword"
      />

      {/* ---IMAGE/AVATAR--- */}
      <label className=" flex items-center text-gray-600">
        <span className="mt-4">Add Picture / Avatar </span>
        <InputField changeFn={onchange("image")} type="file" />
      </label>
    </div>
  );
}
