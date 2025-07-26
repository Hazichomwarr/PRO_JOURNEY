import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { formReducer, initialState } from "../reducers/formReducer";

//1. Create context
const FormContext = createContext(null);

//2. Custom hook for easier consumption
export const useForm = () => useContext(FormContext);

// 3. Initializer for localStorage sync
const initializer = () => {
  const stored = localStorage.getItem("formData");
  return stored ? JSON.parse(stored) : initialState;
};

//4. Provider Component
export const FormProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, undefined, initializer);

  //5. Save formState in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formState));
  }, [formState]);

  //6. Step Helpers
  const goToNextStep = useCallback(
    (stepFields = [], validate) => {
      const errors = validate(formState.fields);
      let hasError = false;

      stepFields.forEach((field) => {
        dispatch({ type: "touch", payload: { field } });
        const error = errors[field] || "";
        if (error) hasError = true;

        dispatch({
          type: "validateField",
          payload: { field, error },
        });
      });
      if (!hasError) {
        const next = formState.currentStep + 1;
        dispatch({ type: "goToStep", payload: next });
        navigate(`/form/step-${next}`);
      }
    },
    [formState, navigate]
  );

  const goToPrevStep = () => {
    const prev = formState.currentStep - 1;
    dispatch({ type: "goToStep", payload: prev });
    navigate(`/form/step-${prev}`);
  };

  const resetForm = () => {
    dispatch({ type: "reset" });
    navigate("/form/step-1");
  };

  return (
    <FormContext.Provider
      value={{ formState, dispatch, goToNextStep, goToPrevStep, resetForm }}
    >
      {children}
    </FormContext.Provider>
  );
};
