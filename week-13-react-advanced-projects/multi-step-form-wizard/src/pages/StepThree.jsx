import { TextAreaField } from "../components/TextAreaField";
import { useForm } from "../context/FormContext";
import { handleChange, handleBlur } from "../utils/handlers";
import { validation, steps } from "../utils/steps";

export const StepThree = () => {
  const { formState, dispatch, goToNextStep, goToPrevStep } = useForm();

  const { fields, errors, touched } = formState;
  const stepFields = steps[3]; // ['message']

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Step 3: Leave a Message</h2>

      <TextAreaField
        label="Message"
        name="message"
        value={fields.message}
        onChange={(e) => handleChange(e, dispatch)}
        onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        error={errors.message}
        isTouched={touched.message}
      />

      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={goToPrevStep}
        >
          Back
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => goToNextStep(stepFields, validation)}
        >
          Review
        </button>
      </div>
    </div>
  );
};
