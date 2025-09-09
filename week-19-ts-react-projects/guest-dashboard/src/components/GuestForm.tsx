// components/GuestForm.tsx
import { useState } from "react";
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
import ValidationSummaryPanel from "./ValidationSummaryPanel";
import type { FormErrors } from "../models/errors";
import { v4 as uuidv4 } from "uuid";

interface GuestFormProps {
  onAddGuest?: (guest: Guest) => void;
  onUpdate?: (guest: Guest) => void;
  guest?: Guest;
}

type Step = 1 | 2 | 3 | 4;

const stepFields: Record<number, (keyof GuestFormValues)[]> = {
  1: ["name", "email", "phone"],
  2: ["attending"],
  3: ["category"],
  4: ["meal"], //no accidental 5: [...]
};

const stepLabels: Record<Step, string> = {
  1: "Info",
  2: "Attending",
  3: "Category",
  4: "Meal",
};

export default function GuestForm({
  onAddGuest,
  onUpdate,
  guest,
}: GuestFormProps) {
  const { values, errors, handleChange, handleSubmit, setErrors } =
    useForm<GuestFormValues>({
      initialValues: guest ?? formInitialValues,
      validate: validateForm,
      onSubmit: (values) => {
        if (guest && onUpdate) {
          //Edit Guest
          onUpdate({ ...guest, ...values });
        } else if (onAddGuest) {
          //Add Guest
          onAddGuest({ ...values, id: Number(uuidv4()) });
        }
      },
    });

  // Multi-step-actions
  const [step, setStep] = useState<number>(1);
  const stepFields_lentgh = Object.keys(stepFields).length;

  function handleNext() {
    const allErrors = validateForm(values);

    const currentStepFields = stepFields[step];
    const currentStepErrors: FormErrors = {};
    currentStepFields.forEach((field) => {
      if (allErrors[field]) currentStepErrors[field] = allErrors[field];
    });
    setErrors(currentStepErrors);

    //move to the next step if no errors
    if (Object.keys(currentStepErrors).length === 0) {
      let nextStep = (step + 1) as Step;

      //skip to the end if not attending
      if (nextStep === 2 && values.attending === false) {
        nextStep = stepFields_lentgh as Step; //the last step
      }
      setStep(nextStep);
    }
  }

  return (
    <form
      className="w-full max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl shadow-md"
      onSubmit={handleSubmit}
    >
      {/* Form HEADER */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {guest ? "Edit Guest" : "Add New Guest"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {guest ? "" : "Fill in the details below"}
        </p>
        <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-2 rounded-full" />
      </div>

      {/* Textual Indicator of steps*/}
      <div className="w-fit my-2 mx-auto font-semibold text-gray-700">
        (Step {step} of {stepFields_lentgh})
      </div>

      {/* Horizontal Progress Bar */}
      <div className="w-full rounded-full h-2 bg-gray-200">
        <div
          className=" bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / stepFields_lentgh) * 100}%` }}
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-between text-sm mb-2">
        {Object.entries(stepLabels).map(([key, label]) => (
          <span
            key={key}
            className={Number(key) <= step ? "font-bold text-blue-600" : ""}
          >
            {label}
          </span>
        ))}
      </div>
      {/* <div className="flex justify-between text-sm mb-2">
        <span className={step >= 1 ? "font-bold" : ""}>Info</span>
        <span className={step >= 2 ? "font-bold" : ""}>Attending</span>
        <span className={step >= 3 ? "font-bold" : ""}>Category</span>
        <span className={step >= 4 ? "font-bold" : ""}>Meal</span>
      </div> */}

      {/* Show summary panel if errors exist */}
      <ValidationSummaryPanel errors={errors} variant="warning" />

      {/* Step 1: Info */}
      {step === 1 && (
        <>
          <div className="w-full grid grid-cols-2 gap-2 justify-items-center">
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
            <InputField
              label="Phone"
              name="phone"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* Step 2: Attending */}
      {step === 2 && (
        <div className="w-full grid grid-cols-1 gap-4 justify-items-center">
          {/* ATTENDING */}
          <CheckboxField
            label="Attending?"
            name="attending"
            checked={values.attending}
            onChange={handleChange}
            error={errors.attending}
          />
        </div>
      )}

      {/* Step 3: Category */}
      {step === 3 && (
        <RadioField
          name="category"
          value={values.category}
          categories={CATEGORIES}
          onChange={handleChange}
        />
      )}

      {/* Step 4: Meal */}
      {step === 4 && (
        <SelectField
          label="Meal Options"
          name="meal"
          value={values.meal}
          options={MEALS}
          onChange={handleChange}
          error={errors.meal}
        />
      )}

      {/* NAVOGATION BUTTONS */}
      <div className="flex justify-between gap-4 mt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((step - 1) as Step);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-500"
          >
            Back
          </button>
        )}
        {step < stepFields_lentgh && (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-500"
          >
            Next
          </button>
        )}
      </div>

      {step === stepFields_lentgh && (
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {guest ? "Update Guest" : "Add Guest"}
        </button>
      )}
    </form>
  );
}
