// components/GuestForm.tsx
import { formInitialValues, validateForm } from "../forms/formConfig";
import useForm from "../hooks/useGuestForm";
import {
  CATEGORIES,
  MEALS,
  type Guest,
  type GuestFormValues,
} from "../models/guest";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";

interface GuestFormProps {
  onAddGuest?: (guest: Guest) => void;
  onUpdate?: (guest: Guest) => void;
  guest?: Guest;
}

export default function GuestForm({
  onAddGuest,
  onUpdate,
  guest,
}: GuestFormProps) {
  const { values, errors, handleChange, handleSubmit } =
    useForm<GuestFormValues>({
      initialValues: guest ?? formInitialValues,
      validate: validateForm,
      onSubmit: (values) => {
        if (guest && onUpdate) {
          //Edit Guest
          onUpdate({ ...guest, ...values });
        } else if (onAddGuest) {
          //Add Guest
          onAddGuest({ ...values, id: Date.now() });
        }
      },
    });

  return (
    <form
      className="w-full max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {guest ? "Edit Guest" : "Add New Guest"}
      </h2>

      {/* NAME + EMAIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Name"
          name="name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* PHONE */}
        <InputField
          label="Phone"
          name="phone"
          value={values.phone}
          error={errors.phone}
          onChange={handleChange}
        />
        {/* ATTENDING */}
        <CheckboxField
          label="Attending?"
          name="attending"
          checked={values.attending}
          onChange={handleChange}
          error={errors.attending}
        />
      </div>

      {/* CATEGORY */}
      <RadioField
        name="category"
        value={values.category}
        categories={CATEGORIES}
        onChange={handleChange}
      />

      {/* MEAL OPTIONS */}
      <SelectField
        label="Meal Options"
        name="meal"
        value={values.meal}
        options={MEALS}
        onChange={handleChange}
        error={errors.meal}
      />

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition"
      >
        {guest ? "Update Guest" : "Add Guest"}
      </button>
    </form>
  );
}
