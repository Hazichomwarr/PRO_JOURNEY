import { InputField } from "../components/InputField";
import { useForm } from "../context/FormContext";
import { handleChange, handleBlur } from "../utils/handlers";
import { validation, steps } from "../utils/steps";

export const StepOne = () => {
  const { formState, dispatch, goToNextStep } = useForm();

  const fields = formState.fields;
  const errors = formState.errors;
  const touched = formState.touched;

  const stepFields = steps[1]; // ['name', 'email', 'phone']

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Step 1: Basic Info</h2>

      <InputField
        label="Full Name"
        name="name"
        type="text"
        value={fields.name}
        onChange={(e) => handleChange(e, "name", dispatch)}
        onBlur={(e) => handleBlur(e, "name", dispatch, fields, validation)}
        error={errors.name}
        isTouched={touched.name}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={fields.email}
        onChange={(e) => handleChange(e, "email", dispatch)}
        onBlur={(e) => handleBlur(e, "email", dispatch, fields, validation)}
        error={errors.email}
        isTouched={touched.email}
      />

      <InputField
        label="Phone"
        name="phone"
        type="text"
        value={fields.phone}
        onChange={(e) => handleChange(e, "phone", dispatch)}
        onBlur={(e) => handleBlur(e, "phone", dispatch, fields, validation)}
        error={errors.phone}
        isTouched={touched.phone}
      />

      <div className="mt-6 flex justify-end">
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
