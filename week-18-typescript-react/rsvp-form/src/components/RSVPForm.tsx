import type { Guest } from "../models/guest";
import useForm from "../hooks/useForm";
import InputField from "./InputField";
import { formInitialValues, validateForm } from "../forms/formConfig";
import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";
import { MEALS } from "../models/meal";
import { useState } from "react";

interface RSVPFormProps {
  onAddGuest: (guest: Guest) => void;
}

export default function RSVPForm({ onAddGuest }: RSVPFormProps) {
  const { values, errors, setErrors, handleSubmit, handleChange } =
    useForm<Guest>({
      initialValues: formInitialValues,
      validate: validateForm,
      onSubmit: (values) => {
        onAddGuest({ ...values, id: Date.now() });
      },
    });

  const [step, setStep] = useState<number>(1);

  const stepFields: Record<number, (keyof Guest)[]> = {
    1: ["name", "email"],
    2: ["meal"],
    3: ["attending"],
  };

  function handleNext() {
    const allErrors = validateForm(values);

    //only keep errors for this step
    const currentStepFields = stepFields[step];
    const stepErrors: Partial<Record<keyof Guest, string>> = {};
    currentStepFields.forEach((field) => {
      if (allErrors[field]) stepErrors[field] = allErrors[field]; //typescript outlines this code in red saying: Element implicitly has an 'any' type because expression of type 'keyof Guest' can't be used to index type 'FormErrors<Guest>'.Property 'id' does not exist on type 'FormErrors<Guest>'.
    });
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setStep(step + 1);
    }
  }

  const { name, email, meal, attending } = values;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border p-4 rounded-lg shadow-md"
    >
      {/* Textual Indicator */}
      <div className="w-fit my-2 mx-auto font-semibold text-gray-700">
        ( Step {step} of 3 )
      </div>

      {/* Horizontal Progress Bar*/}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      {/* steps labels */}
      <div className="flex justify-between text-sm mb-2">
        <span className={step >= 1 ? "font-bold" : ""}>Info</span>
        <span className={step >= 2 ? "font-bold" : ""}>Meal</span>
        <span className={step >= 3 ? "font-bold" : ""}>Attending</span>
      </div>

      {step === 1 && (
        // Name, Email
        <>
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
        </>
      )}

      {step === 2 && (
        <>
          <SelectField
            label="Meal"
            name="meal"
            value={meal}
            onChange={handleChange}
            error={errors.meal}
            options={MEALS}
          />
        </>
      )}

      {step === 3 && (
        <>
          <CheckboxField
            label="Attending?"
            name="attending"
            checked={attending}
            onChange={handleChange}
            error={errors.attending}
          />
        </>
      )}

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-between gap-4 mt-4">
        {step > 1 && (
          <button
            type="button"
            className="btn"
            onClick={() => {
              setErrors({});
              setStep(step - 1);
            }}
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            className="btn disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleNext}
            // disabled={Object.keys(errors).length > 0}
          >
            Next
          </button>
        )}

        {step === 3 && (
          <button
            type="submit"
            className="btn disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Add Guest
          </button>
        )}
      </div>
    </form>
  );
}
