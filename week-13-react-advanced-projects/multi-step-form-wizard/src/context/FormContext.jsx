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
export const FormProvider = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, undefined, initializer);

  //5. Save formState in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formState));
  }, [formState]);
  return <div>FormContext</div>;
};
