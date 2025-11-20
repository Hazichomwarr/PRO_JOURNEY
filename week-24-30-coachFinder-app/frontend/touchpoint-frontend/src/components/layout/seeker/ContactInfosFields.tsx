import { UserFormEvent } from "../../../hooks/useRegisterForm";
import { UserFormErrors, UserFormValues } from "../../../models/user";
import InputField from "../../ui/InputField";

interface Props {
  values: UserFormValues;
  errors: UserFormErrors;
  onchange: (field: keyof UserFormValues) => (e: UserFormEvent) => void;
}

export default function ContactInfosFields({
  values,
  errors,
  onchange,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <InputField
        value={values.firstName}
        changeFn={onchange("firstName")}
        type="text"
        placeholder="First Name"
        error={errors.firstName}
      />
      <InputField
        value={values.lastName}
        changeFn={onchange("lastName")}
        type="text"
        placeholder="Last Name"
        error={errors.lastName}
      />

      <InputField
        value={values.email}
        changeFn={onchange("email")}
        type="email"
        placeholder="Email"
        error={errors.email}
      />

      <InputField
        value={values.phone}
        changeFn={onchange("phone")}
        type="tel"
        placeholder="Phone"
        error={errors.phone}
        name="phone"
      />

      <InputField
        value={values.city}
        changeFn={onchange("city")}
        type="text"
        placeholder="City"
        error={errors.city}
      />

      <InputField
        value={values.state}
        changeFn={onchange("state")}
        type="text"
        placeholder="State/Country"
        error={errors.state}
      />

      {/* --- Birth Date --- */}
      <label className="flex flex-col gap-2 text-gray-600 col-span-2">
        <div className="text-xl font-semibold">Date of Birth</div>
        <InputField
          value={values.birthDate}
          changeFn={onchange("birthDate")}
          type="date"
          placeholder="Birth Date"
          error={errors.birthDate}
        />
      </label>
    </div>
  );
}
