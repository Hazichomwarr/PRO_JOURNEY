//hooks/useCoachRegistration.ts
import React, { useReducer } from "react";
import { CoachFormValues } from "../models/coach";
import axiosClient from "../lib/axiosClient";

export const initialCoachDocState: CoachFormValues = {
  bio: "",
  expertise: "",
  hourlyRate: null,
  availability: "",
};

type Action =
  | { type: "SET_FIELD"; field: keyof CoachFormValues; value: string }
  | { type: "RESET" };

function reducer(state: CoachFormValues, action: Action): CoachFormValues {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialCoachDocState;
    default:
      return state;
  }
}

export function useCoachRegistration() {
  const [state, dispatch] = useReducer(reducer, initialCoachDocState);

  const handleChange =
    (
      field: keyof CoachFormValues //it's called currying(to remeber it)
    ) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      // let value: string | number = e.target.value;
      // if (field === "hourlyRate") value = Number(value);
      dispatch({ type: "SET_FIELD", field, value: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const isFormValid = Object.values(state).every(
      (v) => v !== "" && v !== null
    );
    if (!isFormValid) {
      alert("Please fill out all fields!");
    }
    try {
      const res = await axiosClient.post("/coaches", state);
      const newCoach = res.data;
      console.log("Registered Coach ->", newCoach);
      alert("Registration successful!");
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
