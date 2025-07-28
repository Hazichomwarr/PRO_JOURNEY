import { useForm } from "../context/FormContext";
import { handleChange, handleBlur } from "../utils/handlers";
import { validation, steps } from "../utils/steps";
import { CheckboxField } from "../components/CheckBoxField";
import { RadioField } from "../components/RadioField";
import { RadioFieldWrapper } from "../components/RadioFieldWrapper";

export const StepTwo = () => {
  const { formState, dispatch, goToNextStep, goToPrevStep } = useForm();

  const { fields, errors, touched } = formState;
  const stepFields = steps[2]; // ['isSubscribe', 'contactMethod']

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Step 2: Preferences</h2>

      <CheckboxField
        label="Subscribe to Newsletter?"
        name="isSubscribe"
        checked={fields.isSubscribe}
        onChange={(e) => handleChange(e, dispatch)}
        onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        error={errors.isSubscribe}
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
          onChange={(e) => handleChange(e, dispatch)}
          onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        />
        <RadioField
          label="Phone"
          name="contactMethod"
          value="phone"
          checked={fields.contactMethod === "phone"}
          onChange={(e) => handleChange(e, dispatch)}
          onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        />
      </RadioFieldWrapper>

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
          Next
        </button>
      </div>
    </div>
  );
};
