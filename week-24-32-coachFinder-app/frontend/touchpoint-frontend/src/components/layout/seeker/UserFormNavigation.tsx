//components/layout/seeker/UserFormNavigation.tsx
import { useEffect } from "react";
import { UserFormErrors } from "../../../models/user";

interface Props {
  step: number;
  stepLength: number;
  setStep: (step: number) => void;
  errors: UserFormErrors;
  setErrors: (errors: UserFormErrors) => void;
  onNext: () => void;
}

export default function UserFormNavigation({
  step,
  setErrors,
  setStep,
  errors,
  onNext,
  stepLength,
}: Props) {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="flex justify-between gap-4 mt-4">
      {step > 1 && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-500"
          type="button"
          onClick={() => {
            setErrors({}); //remove all errors when going back
            setStep(step - 1);
          }}
        >
          Back
        </button>
      )}
      {step < stepLength && (
        <button
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-[0.97] transition-all disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={onNext}
        >
          Next
        </button>
      )}
      {/* --- Submit --- */}
      {step === stepLength && (
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Register
        </button>
      )}{" "}
    </div>
  );
}
