import { InputField } from "./InputField";
import { useFormReducer } from "../hooks/useFormReducer";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextAreaField } from "./TextAreaField";
import { RadioFieldWrapper } from "./RadioFieldWrapper";
import { formReducer, initialState } from "../reducers/formreducer";
import { validate } from "../utils/validation";
import { stepLabels, getSteps } from "../utils/steps";
import { ProgressTracker } from "./ProgressTracker";

export const Form = () => {
  const {
    formState,
    dispatch,
    handleChange,
    handleBlur,
    handleSubmit,
    canProceedToNextStep,
  } = useFormReducer(formReducer, initialState, validate);

  const step = formState.currentStep;
  const steps = getSteps(formState);

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-1/2 my-2 mx-auto flex flex-col bg-gray-100 shadow p-6 rounded"
    >
      <div className="flex justify-between items-center mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 mx-1 rounded ${
              formState.currentStep >= index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <ProgressTracker
        currentStep={formState.currentStep}
        labels={stepLabels}
      />

      {step === 0 && (
        <>
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={formState.fields.name}
            onChange={(e) => handleChange(e, "name")}
            onBlur={(e) => handleBlur(e, "name")}
            error={formState.errors.name}
            isTouched={formState.touched.name}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formState.fields.email}
            onChange={(e) => handleChange(e, "email")}
            onBlur={(e) => handleBlur(e, "email")}
            error={formState.errors.email}
            isTouched={formState.touched.email}
          />
          <InputField
            label="Phone"
            name="phone"
            type="text"
            value={formState.fields.phone}
            onChange={(e) => handleChange(e, "phone")}
            onBlur={(e) => handleBlur(e, "phone")}
            error={formState.errors.phone}
            isTouched={formState.touched.phone}
          />
        </>
      )}

      {step === 1 && (
        <>
          <CheckboxField
            label="Subscribe to newsletter?"
            name="isSubscribe"
            type="checkbox"
            checked={formState.fields.isSubscribe}
            onChange={(e) => handleChange(e, "isSubscribe")}
            onBlur={(e) => handleBlur(e, "isSubscribe")}
          />
          <RadioFieldWrapper error={formState.errors.contactMethod}>
            <RadioField
              label="phone"
              name="phone"
              type="radio"
              value="phone"
              checked={formState.fields.contactMethod === "phone"}
              onChange={(e) => handleChange(e, "contactMethod")}
              onBlur={(e) => handleBlur(e, "contactMethod")}
            />
            <RadioField
              label="email"
              name="email"
              type="radio"
              value="email"
              checked={formState.fields.contactMethod === "email"}
              onChange={(e) => handleChange(e, "contactMethod")}
              onBlur={(e) => handleBlur(e, "contactMethod")}
            />
          </RadioFieldWrapper>
        </>
      )}

      {step === 2 && (
        <TextAreaField
          label="Message"
          name="message"
          value={formState.fields.message}
          onChange={(e) => handleChange(e, "message")}
          onBlur={(e) => handleBlur(e, "message")}
          error={formState.errors.message}
          isTouched={formState.touched.message}
        />
      )}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "prevStep" })}
            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        {step < getSteps(formState).length - 1 ? (
          <button
            type="button"
            onClick={() => {
              if (canProceedToNextStep()) dispatch({ type: "nextStep" });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
      {formState.isFormReady && (
        <p className="bg-green-100 text-green-800 p-2 mt-4 rounded">
          ✅ Form submitted!
        </p>
      )}
    </form>
  );
};
