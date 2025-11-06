import { useReducer } from "react";
import axiosClient from "../lib/axiosClient";
import { useNavigate } from "react-router-dom";

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
};

// ---- Reducer ----
type Action =
  | { type: "SET_FIELD"; field: keyof UserFormValues; value: string }
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
      console.log("Registered user:", newUser);

      alert("Registration successful! Please log in.");
      navigate("/login");
      dispatch({ type: "RESET" });
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return { state, handleChange, handleSubmit };
}
