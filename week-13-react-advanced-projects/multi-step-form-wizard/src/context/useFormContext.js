import { useContext } from "react";
import { FormContext } from "./FormContext";
import { handleBlur, handleChange } from "../utils/handlers";
import { validation } from "../utils/steps";

export const useFormContext = () => {
  const { formState, dispatch } = useContext(FormContext);

  const onChange = (e) => {
    handleChange(e, dispatch);
  };
  const onBlur = (e) => {
    handleBlur(e, dispatch);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = validation(formState.fields);
    const isComplete = Object.values(formState.fields).every(Boolean);

    if (Object.keys(errors).length === 0 && isComplete) {
      dispatch({ type: "ready" });
    } else {
      dispatch({ type: "error", payload: { errors } });

      //Mark all as touched
      Object.keys(formState.fields).forEach((field) => {
        dispatch({ type: Touch, payload: { field } });
      });
    }
  };

  return { formState, dispatch, onChange, onBlur, onSubmit };
};
