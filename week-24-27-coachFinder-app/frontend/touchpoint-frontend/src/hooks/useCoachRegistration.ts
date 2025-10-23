//hooks/useCoachRegistration.ts
import React, { useReducer } from "react";
import { CoachFormValues } from "../models/coach";
import axiosClient from "../lib/axiosClient";
import toast from "react-hot-toast";
import string from "figlet/fonts/babyface-lame";

interface CoachFormState {
  values: CoachFormValues;
  loading: boolean;
  success: boolean;
  errors: Partial<Record<keyof CoachFormValues, string>>;
}

export const initialCoachDocState: CoachFormState = {
  values: { bio: "", expertise: [], hourlyRate: null, availability: {} },
  loading: false,
  success: false,
  errors: {},
};

type Action =
  | { type: "SET_FIELD"; field: keyof CoachFormValues; value: string }
  | { type: "TOGGLE_EXPERTISE"; value: string }
  | { type: "TOGGLE_AVAILABILITY"; values: { day: string; slot: string } }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_ERROR"; field: keyof CoachFormValues; message: string }
  | { type: "SET_SUCCESS"; value: boolean }
  | { type: "CLEAR_ERROR"; field: keyof CoachFormValues }
  | { type: "RESET_FORM" };

function reducer(state: CoachFormState, action: Action): CoachFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: { ...state.errors, [action.field]: "" },
      };

    case "TOGGLE_EXPERTISE":
      const already = state.values.expertise.includes(action.value);
      return {
        ...state,
        values: {
          ...state.values,
          expertise: already
            ? state.values.expertise.filter((e) => e !== action.value)
            : [...state.values.expertise, action.value],
        },
      };

    case "TOGGLE_AVAILABILITY":
      const { day, slot } = action.values;
      const daySlots = state.values.availability[day] || [];
      const updatedSlots = daySlots.includes(slot)
        ? daySlots.filter((s) => s !== slot)
        : [...daySlots, slot];
      return {
        ...state,
        values: {
          ...state.values,
          availability: { ...state.values.availability, [day]: updatedSlots },
        },
      };

    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };

    case "CLEAR_ERROR":
      return { ...state, errors: { ...state.errors, [action.field]: "" } };
    case "SET_SUCCESS":
      return { ...state, success: action.value };

    case "RESET_FORM":
      return initialCoachDocState;
    default:
      return state;
  }
}

export function useCoachRegistration() {
  const [state, dispatch] = useReducer(reducer, initialCoachDocState);

  const handleChange =
    (
      field: keyof CoachFormValues //it's called currying(to remember it)
    ) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type: "SET_FIELD", field, value: e.target.value });
    };

  const toggleExpertise = (value: string) =>
    dispatch({ type: "TOGGLE_EXPERTISE", value });

  const toggleAvailability = (day: string, slot: string) =>
    dispatch({ type: "TOGGLE_AVAILABILITY", values: { day, slot } });

  const validateForm = (): boolean => {
    let isValid = true;
    // required fields
    if (!state.values.bio.trim()) {
      dispatch({ type: "SET_ERROR", field: "bio", message: "Bio is required" });
      isValid = false;
    }

    if (state.values.expertise.length === 0) {
      dispatch({
        type: "SET_ERROR",
        field: "expertise",
        message: "Select at least one expertise",
      });
      isValid = false;
    }

    if (!state.values.hourlyRate) {
      dispatch({
        type: "SET_ERROR",
        field: "hourlyRate",
        message: "Hourly rate required",
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm) return;
    dispatch({ type: "SET_LOADING", value: true });

    try {
      const res = await axiosClient.post("/coaches", state.values);
      const newCoach = res.data;
      console.log("Registered Coach ->", newCoach);

      toast.success("Coach registered successfully!");
      dispatch({ type: "SET_SUCCESS", value: true });
      dispatch({ type: "RESET_FORM" });
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to register coach");
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };
  return {
    state,
    handleChange,
    handleSubmit,
    toggleExpertise,
    toggleAvailability,
  };
}
