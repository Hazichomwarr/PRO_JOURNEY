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
      let value: any = e.target.value;

      if (field === "image" && e.target instanceof HTMLInputElement) {
        value = e.target.files?.[0] || null; //File Object
      }

      dispatch({ type: "SET_FIELD", field, value });
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
      const formData = new FormData();

      formData.append("firstName", state.firstName);
      formData.append("lastName", state.lastName);
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("confirmPassword", state.confirmPassword);
      formData.append("phone", state.phone);
      formData.append("city", state.city);
      formData.append("state", state.state);
      formData.append("role", state.role);
      formData.append("birthDate", state.birthDate);

      //Append file ONLY if file object exists
      if (state.image instanceof File) {
        formData.append("image", state.image);
      }

      const res = await axiosClient.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
