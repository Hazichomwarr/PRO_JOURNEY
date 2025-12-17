//pages/Register.tsx(it should coordinate the form (not do form things))
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/formConfig";
// import { ALL_INTERESTS, validateForm } from "../utils/formConfig";

// Components
import ContactInfosFields from "../components/layout/seeker/ContactInfosFields";
import RoleInterestFields from "../components/layout/seeker/RoleInterestFields";
import IdentificationFields from "../components/layout/seeker/IdentificationFields";
import { useState } from "react";
import { UserFormErrors, UserFormValues } from "../models/user";
import ValidationSummaryPannel from "../components/layout/ValidationSummaryPannel";
import UserFormNavigation from "../components/layout/seeker/UserFormNavigation";
import MultiStepLabels from "../components/layout/seeker/MultiStepLabels";

const stepFields: Record<number, (keyof UserFormValues)[]> = {
  1: ["firstName", "lastName", "phone", "email", "city", "state", "birthDate"],
  2: ["role"], //'interests' coming soon
  3: ["password", "confirmPassword", "image"],
};

const stepLabels: Record<number, string> = {
  1: "Info",
  2: "Interest",
  3: "identification",
};

export default function Register() {
  const { state, errors, setErrors, handleChange, handleSubmit } =
    useRegisterForm();
  const navigate = useNavigate();

  // Multi-step-actions
  const [step, setStep] = useState<number>(1);
  const stepLength = Object.keys(stepFields).length;

  function handleNext() {
    const allErrors = validateForm(state); //ex: {firstName: "name required", ...}

    const currentStepFields = stepFields[step]; //ex: [pwd, confirmPwd, img]
    const currentStepErrors: UserFormErrors = {};
    currentStepFields.forEach((field) => {
      if (allErrors[field]) currentStepErrors[field] = allErrors[field];
    });
    setErrors(currentStepErrors);

    if (Object.keys(currentStepErrors).length === 0) {
      let nextStep = step + 1;
      setStep(nextStep);
    }
  }

  return (
    <div className="mt-6 flex flex-col max-h-[90vh] items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md space-y-4"
      >
        {/* Form Header */}
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create Your User Account
        </h2>

        {/* Multi Step Labels Indicators */}
        <MultiStepLabels
          step={step}
          stepLabels={stepLabels}
          stepLength={stepLength}
        />

        {/* Show summary panel if errors exist */}
        <ValidationSummaryPannel errors={errors} variant="warning" />

        {/* ---Contact Fields--- */}
        {step === 1 && (
          <ContactInfosFields
            values={state}
            errors={errors}
            onchange={handleChange}
          />
        )}
        {/* --- Role & Interests Fields--- */}
        {step === 2 && (
          <RoleInterestFields
            values={state}
            errors={errors}
            onchange={handleChange}
          />
        )}

        {/* --- Passwords & Image Fields --- */}
        {step === 3 && (
          <IdentificationFields
            values={state}
            errors={errors}
            onchange={handleChange}
          />
        )}

        {/* Step Buttons */}
        <UserFormNavigation
          step={step}
          setStep={setStep}
          onNext={handleNext}
          stepLength={stepLength}
          setErrors={setErrors}
          errors={errors}
        />
      </form>

      <aside className="text-center pb-2">
        Already Have an Account ?
        <button
          onClick={() => navigate("/login")}
          className="ml-2 text-orange-600 font-semibold underline"
        >
          Login
        </button>
      </aside>
    </div>
  );
}
