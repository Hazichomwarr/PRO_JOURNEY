// components/GuestForm.tsx
import { useState, type JSX } from "react";
import { formInitialValues, validateForm } from "../forms/formConfig";
import useForm from "../hooks/useGuestForm";
import { type Guest, type GuestFormValues } from "../models/guest";
import ValidationSummaryPanel from "./ValidationSummaryPanel";
import type { FormErrors } from "../models/errors";
import { v4 as uuidv4 } from "uuid";
import ContactFields from "./ContactFields";
import AttendanceField from "./AttendanceField";
import CategoryField from "./CategoryField";
import MealPreferenceField from "./MealPreferenceField";
import FormNavigation from "./FormNavigation";

interface GuestFormProps {
  onAddGuest?: (guest: Guest) => void;
  onUpdate?: (guest: Guest) => void;
  guest?: Guest;
}

export type Step = 1 | 2 | 3 | 4;

const stepFields: Record<Step, (keyof GuestFormValues)[]> = {
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
          onAddGuest({ ...values, id: uuidv4() });
        }
      },
    });

  // Multi-step-actions
  const [step, setStep] = useState<Step>(1);
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
      if (values.attending === false && nextStep === 2) {
        nextStep = stepFields_lentgh as Step; //the last step
      }
      setStep(nextStep);
    }
  }

  //Map steps to Components
  const stepComponents: Record<Step, JSX.Element> = {
    1: (
      <ContactFields values={values} errors={errors} onChange={handleChange} />
    ),
    2: (
      <AttendanceField
        values={values}
        errors={errors}
        onChange={handleChange}
      />
    ),
    3: <CategoryField values={values} onChange={handleChange} />,
    4: (
      <MealPreferenceField
        values={values}
        errors={errors}
        onChange={handleChange}
      />
    ),
  };

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
      <div
        className="w-full rounded-full h-2 bg-gray-200"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={stepFields_lentgh}
      >
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
            aria-current={Number(key) === step ? "step" : undefined}
            className={Number(key) <= step ? "font-bold text-blue-600" : ""}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Show summary panel if errors exist */}
      <ValidationSummaryPanel errors={errors} variant="warning" />

      {/* Dynamic Step Rendering */}
      {stepComponents[step]}

      {/* NAVIGATION BUTTONS */}
      <FormNavigation
        step={step}
        setStep={setStep}
        onNext={handleNext}
        setErrors={setErrors}
        stepCount={stepFields_lentgh}
        isEditing={!!guest} //same as Boolean(guest)
      />
    </form>
  );
}
