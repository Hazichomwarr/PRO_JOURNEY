//hooks/useCoachRegistration.ts
import React, { useReducer } from "react";
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
        values: {
          ...state.values,
          availability: [...action.values],
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
  const navigate = useNavigate();
  const { updateRole } = useAuthStore();
  const userRole = useAuthStore((state) => state.user?.role);

  const handleUpgrade = async (onSuccess?: () => void) => {
    try {
      await axiosClient.patch("/users/me/role", { role: "coach" });
      updateRole("coach");
      if (onSuccess) onSuccess(); //component closes modal
      alert("role upgraded to coach successfully!!");
      navigate("/coaches/new");
    } catch (error: any) {
      console.error("Upgrade error:", error.response?.data || error.message);
      alert(`Failed to upgrade role. ${error.message} || Please try again`);
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

  const handleAvailabilityChange = (slots: string[]) => {
    dispatch({ type: "SET_AVAILABILITY", values: slots });
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
    console.log("inside handleSubmit");
    // if (!validateForm()) return;
    console.log("no errors in fields");
    //if user isn't coach, show modal instead of sending request
    if (userRole === "coach") {
      console.log("user is role is coach");
    }

    dispatch({ type: "SET_LOADING", value: true });

    // Fetch fresh role from backend before proceeding
    const { data: user } = await axiosClient.get("/users/me");
    if (user.role !== "coach") {
      alert("Please wait a moment and try again after your role updates.");
      return;
    }

    try {
      await axiosClient.post("/coaches", state.values);
      alert("Coach registered successfully!");
      dispatch({ type: "SET_SUCCESS", value: true });
      dispatch({ type: "RESET_FORM" });
    } catch (error: any) {
      if (error.response?.status === 403) {
      } else {
        console.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  return {
    state,
    handleUpgrade,
    handleChange,
    handleSubmit,
    toggleExpertise,
    handleAvailabilityChange,
  };
}
