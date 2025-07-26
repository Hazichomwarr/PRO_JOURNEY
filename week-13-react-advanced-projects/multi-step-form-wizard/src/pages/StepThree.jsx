// src/pages/StepThree.jsx
import { useForm } from "../context/FormContext";
import { handleChange, handleBlur } from "../utils/handlers";
import { validation, steps } from "../utils/steps";
import { TextAreaField } from "../components/TextAreaField";

export const StepThree = () => {
  const { formState, dispatch, goToPreviousStep, handleSubmit } = useForm();

  const fields = formState.fields;
  const errors = formState.errors;
  const touched = formState.touched;

  const stepFields = steps[3]; // ['message']

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Step 3: Your Message</h2>

      <TextAreaField
        label="Message"
        name="message"
        value={fields.message}
        onChange={(e) => handleChange(e, "message", dispatch)}
        onBlur={(e) => handleBlur(e, "message", dispatch, fields, validation)}
        error={errors.message}
        isTouched={touched.message}
      />

      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={goToPreviousStep}
        >
          Back
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={(e) => handleSubmit(e, steps)}
        >
          Submit
        </button>
      </div>

      {formState.isFormReady && (
        <p className="mt-4 text-green-700 bg-green-100 p-3 rounded">
          ✅ Your message has been submitted successfully!
        </p>
      )}
    </div>
  );
};
