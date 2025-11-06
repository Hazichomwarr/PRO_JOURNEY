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

  // const handleUpgrade = async (onSuccess?: () => void) => {
  //   console.log(
  //     "accessToken in localStorage just before patch ->",
  //     localStorage.getItem("accessToken")
  //   );

  //   try {
  //     const token = localStorage.getItem("accessToken");

  //     console.log("accessToken present?", !!token);
  //     if (token) {
  //       try {
  //         const payload = JSON.parse(atob(token.split(".")[1]));
  //         console.log("decoded access token payload ->", payload);
  //       } catch (err) {
  //         console.log("⚠️ couldn't decode token:", err);
  //       }
  //     }
  //     console.log("axiosClient.baseURL ->", axiosClient.defaults.baseURL);
  //     console.log(
  //       "axiosClient default Authorization ->",
  //       axiosClient.defaults.headers?.common?.Authorization
  //     );

  //     console.log("➡️ About to PATCH /users/upgrade-role");
  //     await axiosClient.patch("/users/upgrade-role", { role: "coach" });
  //     updateRole("coach");

  //     if (onSuccess) onSuccess(); //component closes modal
  //     alert("role upgraded to coach successfully!!");
  //     navigate("/coaches/new");
  //   } catch (error: any) {
  //     console.log("Upgrade error:", error.response?.data || error.message);
  //     alert(`Failed to upgrade role. ${error.message} || Please try again`);
  //   }
  // };

  const handleUpgrade = async (onSuccess?: () => void) => {
    try {
      // 1️⃣ Send request to backend
      await axiosClient.patch("/users/upgrade-role", { role: "coach" });

      // 2️⃣ Update Zustand store
      updateRole("coach");

      // 3️⃣ Wait one microtask tick for store propagation
      await new Promise((r) => setTimeout(r, 0));

      alert("Role upgraded to coach successfully!");
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

    if (userRole === "coach") {
      console.log("user role is", userRole);
    }

    dispatch({ type: "SET_LOADING", value: true });

    // // Fetch fresh role from backend before proceeding
    // const { data: user } = await axiosClient.get("/users/me");
    // if (user.role !== "coach") {
    //   console.log("user freshly fresh with updated role ->", user.role);
    //   alert("Please wait a moment and try again after your role updates.");
    // }

    try {
      await axiosClient.post("/coaches", {
        data: state.values,
        role: "coach",
      }); //<- hardcoded 'coach' while looking for a better way
      dispatch({ type: "SET_SUCCESS", value: true });
      dispatch({ type: "RESET_FORM" });
      alert("Coach registered successfully!");
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
