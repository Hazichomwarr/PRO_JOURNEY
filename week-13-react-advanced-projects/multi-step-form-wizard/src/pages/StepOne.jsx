import { InputField } from "../components/InputField";
import { useForm } from "../context/FormContext";
import { handleChange, handleBlur } from "../utils/handlers";
import { validation, steps } from "../utils/steps";
import { motion } from "framer-motion";

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
        onChange={(e) => handleChange(e, dispatch)}
        onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        error={errors.name}
        isTouched={touched.name}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={fields.email}
        onChange={(e) => handleChange(e, dispatch)}
        onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        error={errors.email}
        isTouched={touched.email}
      />

      <InputField
        label="Phone"
        name="phone"
        type="text"
        value={fields.phone}
        onChange={(e) => handleChange(e, dispatch)}
        onBlur={(e) => handleBlur(e, dispatch, validation, fields)}
        error={errors.phone}
        isTouched={touched.phone}
      />

      <div className="mt-6 flex justify-end">
        {/* <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => goToNextStep(stepFields, validation)}
        >
          Next
        </button> */}
        <motion.button
          key={"next-btn"}
          onClick={() => handleNextClick(stepFields, validation)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={formState.loading}
          whileTap={{ scale: 0.95 }}
        >
          {formState.loading ? (
            <motion.span
              key={"spinner"}
              className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"
            />
          ) : (
            "Next"
          )}
        </motion.button>
      </div>
    </div>
  );
};
