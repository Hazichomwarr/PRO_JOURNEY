//pages/login.tsx
import { useReducer, FormEvent, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axiosClient";
import { useAuthStore, UserFromTokenPayload } from "../store/authStore";
import { useFlashStore } from "../store/flashStore";
import { useCoachStore } from "../store/coachStore";
import InputField from "../components/ui/InputField";
import { validateLoginForm } from "../utils/formConfig";

export interface LoginState {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

type Action =
  | { type: "SET_FIELD"; field: keyof LoginState; payload: string }
  | { type: "RESET" };

const initialLoginState: LoginState = {
  email: "",
  password: "",
};

function reducer(state: LoginState, action: Action): LoginState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    case "RESET":
      return initialLoginState;
    default:
      return state;
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialLoginState);
  const [errors, setErrors] = useState<LoginErrors>({});
  const { setAuth } = useAuthStore();
  const fetCoachId = useCoachStore((s) => s.fetchCoachId);

  const navigate = useNavigate();

  const handleChange =
    (field: keyof LoginState) => (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_FIELD", field, payload: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const loginErrors = validateLoginForm(state);
    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      return;
    }

    try {
      const res = await axiosClient.post("/auth/login", state);
      const { accessToken, refreshToken, user: userInfo } = res.data;

      //decode or fetch user from token if needed
      //const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const user: UserFromTokenPayload = {
        id: userInfo.id,
        email: userInfo.email,
        role: userInfo.role,
      };

      setAuth(user, userInfo, accessToken, refreshToken);

      if (user.role === "coach") {
        await fetCoachId();
      }

      //flash a success msg and redirect
      useFlashStore.getState().addFlash("Logged in successfully!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      useFlashStore.getState().addFlash("Invalid credentials.", "error");
    }
  };

  return (
    <div>
      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[300px] mx-auto my-10 p-6 border rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <label className="flex flex-col gap-1">
          <span className="font-medium">Email</span>

          <InputField
            type="email"
            value={state.email}
            error={errors.email}
            changeFn={handleChange("email")}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-medium">Password</span>

          <InputField
            type="password"
            value={state.password}
            error={errors.password}
            name="password"
            changeFn={handleChange("password")}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center pb-2">
        Don't have an Account?
        <button
          onClick={() => navigate("/register")}
          className="ml-2 text-orange-600 font-semibold underline"
        >
          Register
        </button>
      </p>
    </div>
  );
}
