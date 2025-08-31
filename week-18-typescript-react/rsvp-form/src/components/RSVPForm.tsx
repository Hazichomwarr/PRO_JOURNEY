import type { Guest } from "../models/guest";
import useForm from "../hooks/useForm";
import InputField from "./InputField";
import { formInitialValues, validateForm } from "../forms/formConfig";
import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";
import { MEALS } from "../models/meal";

interface RSVPFormProps {
  onAddGuest: (guest: Guest) => void;
}

export default function RSVPForm({ onAddGuest }: RSVPFormProps) {
  const { values, errors, handleSubmit, handleChange } = useForm<Guest>({
    initialValues: formInitialValues,
    validate: validateForm,
    onSubmit: (values) => {
      onAddGuest({ ...values, id: Date.now() });
    },
  });

  const { name, email, meal, attending } = values;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border p-4 rounded-lg shadow-md"
    >
      {/* NAME */}
      <InputField
        label="Name"
        name="name"
        value={name}
        onChange={handleChange}
        error={errors.name}
      />

      {/* EMAIL */}
      <InputField
        label="Email"
        name="email"
        value={email}
        onChange={handleChange}
        error={errors.email}
      />

      {/* SELECT */}
      <SelectField
        label="Meal"
        name="meal"
        value={meal}
        onChange={handleChange}
        error={errors.meal}
        options={MEALS}
      />

      {/* CHECKBOX */}
      <CheckboxField
        label="Attending?"
        name="attending"
        checked={attending}
        onChange={handleChange}
        error={errors.attending}
      />

      {/* BUTTON */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-500"
      >
        Add Guest
      </button>
    </form>
  );
}
