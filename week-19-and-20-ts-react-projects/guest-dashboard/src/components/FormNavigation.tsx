//components/formNavigation.tsx
import type { FormErrors } from "../models/errors";
import type { Step } from "./GuestForm";

interface FormNavigationProps {
  step: Step;
  setStep: (step: Step) => void;
  stepCount: number;
  setErrors: (errors: FormErrors) => void;
  onNext: () => void;
  isEditing: boolean;
}

export default function FormNavigation({
  step,
  setErrors,
  setStep,
  onNext,
  isEditing,
  stepCount,
}: FormNavigationProps) {
  return (
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
      {step < stepCount && (
        <button
          type="button"
          onClick={onNext}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-[0.97] transition-all"
        >
          Next
        </button>
      )}
      {step === stepCount && (
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isEditing ? "Update Guest" : "Add Guest"}
        </button>
      )}
    </div>
  );
}
