//hooks/useRegistrationForm.ts
import React, { useReducer, useState } from "react";
import axiosClient from "../lib/axiosClient";
import { useNavigate } from "react-router-dom";
import { useFlashStore } from "../store/flashStore";
import { UserFormErrors } from "../models/user";
import { formatPhone, validateForm } from "../utils/formConfig";

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
  interests?: string[];
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
  interests: [],
};

export type UserFormEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

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
  const [errors, setErrors] = useState<UserFormErrors>({});

  const navigate = useNavigate();

  const handleChange = (field: keyof UserFormValues) => (e: UserFormEvent) => {
    let value: any = e.target.value;

    if (field === "image" && e.target instanceof HTMLInputElement) {
      value = e.target.files?.[0] || null; //File Object
    }
    if (field === "phone" && e.target instanceof HTMLInputElement) {
      value = formatPhone(e.target.value);
    }

    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: UserFormErrors = validateForm(state);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
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

  return { state, dispatch, errors, setErrors, handleChange, handleSubmit };
}
