import type { FormValues, Guest } from "../models/guest";
import useForm from "../hooks/useForm";
import { formInitialValues, validateForm } from "../forms/formConfig";
import CheckboxField from "./CheckboxField";
import { useState } from "react";
import ContactInfoFields from "./ContactInfoFields";
import MealPreferenceField from "./MealPreferenceField";
import type { FormErrors } from "../models/errors";

interface RSVPFormProps {
  onAddGuest: (guest: Guest) => void;
}

export default function RSVPForm({ onAddGuest }: RSVPFormProps) {
  const { values, errors, setErrors, handleSubmit, handleChange } =
    useForm<FormValues>({
      initialValues: formInitialValues,
      validate: validateForm,
      onSubmit: (values) => {
        //get current guests list from localStorage
        const existing = JSON.parse(localStorage.getItem("guests") || "[]");

        //Add new Guest
        const updated = [...existing, { ...values, id: Date.now() }];

        //Save back
        localStorage.setItem("guests", JSON.stringify(updated));

        //call parent callback
        onAddGuest({ ...values, id: Date.now() });
      },
    });

  const [step, setStep] = useState<number>(1);

  const stepFields: Record<number, (keyof FormValues)[]> = {
    1: ["name", "email"],
    2: ["meal"],
    3: ["attending"],
  };

  function handleNext() {
    const allErrors = validateForm(values);

    //only keep errors for this step
    const currentStepFields = stepFields[step];
    const stepErrors: FormErrors = {};
    currentStepFields.forEach((field) => {
      if (allErrors[field]) stepErrors[field] = allErrors[field];
    });
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      let nextStep = step + 1;

      //skip Meal step if not attending
      if (nextStep === 2 && values.attending === false) {
        nextStep = 3; //but the default value of attending is false, so we'll always skip
      }
      setStep(nextStep);
    }
  }

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
        <span className={step >= 2 ? "font-bold" : ""}>Attending</span>
        <span className={step >= 3 ? "font-bold" : ""}>Meal</span>
      </div>

      {step === 1 && (
        // Name, Email
        <ContactInfoFields
          values={values}
          errors={errors}
          onChange={handleChange}
        />
      )}

      {step === 2 && (
        <>
          <CheckboxField
            label="Attending?"
            name="attending"
            checked={values.attending ?? false}
            onChange={handleChange}
            error={errors.attending}
          />
        </>
      )}

      {step === 3 && (
        <MealPreferenceField
          values={values}
          errors={errors}
          onChange={handleChange}
        />
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

        {Object.keys(errors).length > 0 && (
          <div>
            <p>Please fix the followinf:</p>
            <ul className="list-disc ml-5">
              {Object.keys(errors).map(([field, msg]) => (
                <li key={field}>{msg}</li>
              ))}
              ;
            </ul>
          </div>
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
