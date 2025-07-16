import { useReducer, useEffect } from "react";
import { getSteps } from "../utils/steps";

export function useFormReducer(reducer, initialState, validate) {
  const initializer = () => {
    const saved = localStorage.getItem("formdata");
    return saved ? JSON.parse(saved) : initialState;
  };
  const [formState, dispatch] = useReducer(reducer, undefined, initializer);

  // 💾 Save on every formState change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formState));
  }, [formState]);

  const handleChange = (e, fieldName) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    dispatch({
      type: "update",
      payload: { field: fieldName, value },
    });
  };

  const handleBlur = (e, fieldName) => {
    dispatch({ type: "touch", payload: { field: fieldName } });

    const validationErrors = validate(formState.fields);
    const fieldError = validationErrors[fieldName] || "";

    dispatch({
      type: "validateField",
      payload: { field: fieldName, error: fieldError },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formState.fields);

    const requiredFieldsTouched = Object.values(formState.touched).length > 0;
    const isValid = Object.keys(errors).length === 0;

    if (requiredFieldsTouched && isValid) {
      dispatch({ type: "ready" });
    } else {
      dispatch({ type: "error", payload: { errors } });
    }
  };

  const canProceedToNextStep = () => {
    const steps = getSteps(formState);
    const currentFields = steps[formState.currentStep];
    const errors = validate(formState.fields);
    let stepHasError = false;

    currentFields.forEach((field) => {
      dispatch({ type: "touch", payload: { field } });

      const error = errors[field] || "";
      if (error) stepHasError = true;

      dispatch({
        type: "validateField",
        payload: { field, error },
      });
    });

    return !stepHasError;
  };

  useEffect(() => {
    if (formState.isFormReady) {
      const timeout = setTimeout(() => {
        dispatch({ type: "reset" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [formState.isFormReady]);

  return {
    formState,
    dispatch,
    handleChange,
    handleBlur,
    handleSubmit,
    canProceedToNextStep,
  };
}
