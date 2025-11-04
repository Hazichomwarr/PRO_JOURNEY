import React, { useReducer, useState } from "react";
import { CoachFormValues } from "../models/coach";
import axiosClient from "../lib/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface CoachFormState {
  values: CoachFormValues;
  loading: boolean;
  success: boolean;
  errors: Partial<Record<keyof CoachFormValues, string>>;
}

export const initialCoachDocState: CoachFormState = {
  values: {
    bio: "",
    expertise: [],
    hourlyRate: null,
    availability: [], // ✅ simplified to string[]
  },
  loading: false,
  success: false,
  errors: {},
};

type Action =
  | { type: "SET_FIELD"; field: keyof CoachFormValues; value: string | number }
  | { type: "TOGGLE_EXPERTISE"; value: string }
  | { type: "SET_AVAILABILITY"; values: string[] }
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
      const exists = state.values.expertise.includes(action.value);
      return {
        ...state,
        values: {
          ...state.values,
          expertise: exists
            ? state.values.expertise.filter((x) => x !== action.value)
            : [...state.values.expertise, action.value],
        },
      };

    case "SET_AVAILABILITY":
      return {
        ...state,
        values: { ...state.values, availability: action.values },
      };

    case "SET_LOADING":
      return { ...state, loading: action.value };

    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: "" },
      };

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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      const res = await axiosClient.patch("/users/me/role", { role: "coach" });
      const updateRole = useAuthStore((s) => s.updateRole);
      updateRole("coach");
      setShowUpgradeModal(false);
      navigate("/coaches/new");
    } catch (error: any) {
      console.error("Upgrade error:", error.response?.data || error.message);
      alert("Failed to upgrade role. Please try again.");
    }
  };

  const handleChange =
    (field: keyof CoachFormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value =
        field === "hourlyRate" ? Number(e.target.value) : e.target.value;
      dispatch({ type: "SET_FIELD", field, value });
    };

  const toggleExpertise = (value: string) =>
    dispatch({ type: "TOGGLE_EXPERTISE", value });

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    dispatch({ type: "SET_AVAILABILITY", values: selected });
  };

  const validateForm = (): boolean => {
    let isValid = true;

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
    if (!validateForm()) return;

    dispatch({ type: "SET_LOADING", value: true });

    try {
      const res = await axiosClient.post("/coaches", state.values);
      alert("Coach registered successfully!");
      dispatch({ type: "SET_SUCCESS", value: true });
      dispatch({ type: "RESET_FORM" });
    } catch (error: any) {
      if (error.response?.status === 403) {
        setShowUpgradeModal(true);
      } else {
        console.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  return {
    state,
    showUpgradeModal,
    setShowUpgradeModal,
    handleUpgrade,
    handleChange,
    handleSubmit,
    toggleExpertise,
    handleAvailabilityChange,
  };
}
