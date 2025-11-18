//hooks/useCoachRegistration.ts
import React, { useReducer } from "react";
import { CoachFormValues } from "../models/coach";
import axiosClient from "../lib/axiosClient";
import { useAuthStore } from "../store/authStore";
import { useFlashStore } from "../store/flashStore";
import { useNavigate } from "react-router-dom";

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
  const { updateRole } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const handleUpgrade = async (onSuccess?: () => void) => {
    console.log("inside handle role upgrade");
    console.log("user Id ->", user?.id);
    try {
      // 1. Send request to backend
      await axiosClient.patch("/users/upgrade-role", {
        role: "coach",
      });

      // await fetch("http://localhost:3000/api/users/upgrade-role", {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: user?.id,
      //     role: "coach",
      //   }),
      // });

      //2. Update Zustand store
      updateRole("coach");

      // 3. Wait one microtask tick for store propagation
      await new Promise((r) => setTimeout(r, 0));
      useFlashStore
        .getState()
        .addFlash("Role upgraded to coach successfully!", "success");
      if (onSuccess) onSuccess(); // closes modal
    } catch (error: any) {
      console.error("Upgrade error:", error.response?.data || error.message);
      alert(`Failed to upgrade role. ${error.message}`);
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
    if (!validateForm()) {
      console.log("error in form fields ->", state.errors);
      return;
    }
    console.log("no errors in fields");

    if (user?.role === "coach") {
      console.log("user role is", user.role);
    }

    dispatch({ type: "SET_LOADING", value: true });

    try {
      await axiosClient.post("/coaches", {
        data: state.values,
        role: "coach",
      }); //<- hardcoded 'coach' while looking for a better way
      dispatch({ type: "SET_SUCCESS", value: true });
      dispatch({ type: "RESET_FORM" });
      navigate(-1);
      useFlashStore
        .getState()
        .addFlash("Coach registered successfully!", "success");
    } catch (error: any) {
      if (error.response?.status === 403) {
        console.log("bad request from handleSubmit catch block");
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
