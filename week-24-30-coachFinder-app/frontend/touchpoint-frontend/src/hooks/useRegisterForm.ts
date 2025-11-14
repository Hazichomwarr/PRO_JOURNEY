import { useReducer } from "react";
import axiosClient from "../lib/axiosClient";
import { useNavigate } from "react-router-dom";
import { useFlashStore } from "../store/flashStore";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  state: string;
  role: "coach" | "buddy" | "seeker" | "";
  birthDate: string;
  image?: File | string | null;
}

export const initialRegisterState: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  city: "",
  state: "",
  role: "",
  birthDate: "",
  image: "",
};

// ---- Reducer ----
type Action =
  | {
      type: "SET_FIELD";
      field: keyof UserFormValues;
      value: UserFormValues[keyof UserFormValues];
    }
  | { type: "RESET" };

function reducer(state: UserFormValues, action: Action): UserFormValues {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialRegisterState;
    default:
      return state;
  }
}

// ---- Hook ----
export function useRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialRegisterState);
  const navigate = useNavigate();

  const handleChange =
    (field: keyof UserFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch({ type: "SET_FIELD", field, value: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Basic validation ---
    if (state.password !== state.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!state.role) {
      alert("Please select a role.");
      return;
    }

    try {
      const res = await axiosClient.post("/auth/register", state);
      const { confirmPassword, ...newUser } = res.data;
      console.log("New Registered user:", newUser);

      useFlashStore
        .getState()
        .addFlash("Registration successful! Please log in.", "success");
      navigate("/login");
      dispatch({ type: "RESET" });
    } catch (error: any) {
      console.log("Registration error:", error.response?.data || error.message);
      useFlashStore
        .getState()
        .addFlash("Something went wrong. Try again later", "info");
    }
  };

  return { state, dispatch, handleChange, handleSubmit };
}
