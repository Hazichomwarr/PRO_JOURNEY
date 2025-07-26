// src/pages/StepTwo.jsx
import { useForm } from "../context/FormContext";
import { handleChange, handleBlur } from "../utils/handlers";
import { validation, steps } from "../utils/steps";
import { CheckboxField } from "../components/CheckboxField";
import { RadioFieldWrapper } from "../components/RadioFieldWrapper";
import { RadioField } from "../components/RadioField";

export const StepTwo = () => {
  const { formState, dispatch, goToNextStep, goToPreviousStep } = useForm();

  const fields = formState.fields;
  const errors = formState.errors;
  const touched = formState.touched;

  const stepFields = steps[2]; // ['isSubscribe', 'contactMethod']

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Step 2: Preferences</h2>

      <CheckboxField
        label="Subscribe to Newsletter?"
        name="isSubscribe"
        checked={fields.isSubscribe}
        onChange={(e) => handleChange(e, "isSubscribe", dispatch)}
        onBlur={(e) =>
          handleBlur(e, "isSubscribe", dispatch, fields, validation)
        }
        error={errors.isSubscribe}
        isTouched={touched.isSubscribe}
      />

      <RadioFieldWrapper
        label="Preferred Contact Method"
        error={errors.contactMethod}
      >
        <RadioField
          label="Email"
          name="contactMethod"
          value="email"
          checked={fields.contactMethod === "email"}
          onChange={(e) => handleChange(e, "contactMethod", dispatch)}
          onBlur={(e) =>
            handleBlur(e, "contactMethod", dispatch, fields, validation)
          }
          isTouched={touched.contactMethod}
        />
        <RadioField
          label="Phone"
          name="contactMethod"
          value="phone"
          checked={fields.contactMethod === "phone"}
          onChange={(e) => handleChange(e, "contactMethod", dispatch)}
          onBlur={(e) =>
            handleBlur(e, "contactMethod", dispatch, fields, validation)
          }
          isTouched={touched.contactMethod}
        />
      </RadioFieldWrapper>

      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={goToPreviousStep}
        >
          Back
        </button>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => goToNextStep(stepFields, validation)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
