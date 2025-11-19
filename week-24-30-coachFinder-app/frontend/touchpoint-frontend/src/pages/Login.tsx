//pages/login.tsx
import { useReducer, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axiosClient";
import { useAuthStore } from "../store/authStore";
import { useFlashStore } from "../store/flashStore";
import { useCoachStore } from "../store/coachStore";

interface LoginState {
  email: string;
  password: string;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "RESET" };

const initialLoginState: LoginState = {
  email: "",
  password: "",
};

function reducer(state: LoginState, action: Action): LoginState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return initialLoginState;
    default:
      return state;
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialLoginState);
  const { setAuth } = useAuthStore();
  const fetCoachId = useCoachStore((s) => s.fetchCoachId);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/login", state);
      const { accessToken, refreshToken, user: userInfo } = res.data;

      //decode or fetch user from token if needed
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };

      setAuth(user, userInfo, accessToken, refreshToken);

      if (user.role === "coach") {
        await fetCoachId();
      }

      //flash a success and redirect
      useFlashStore.getState().addFlash("Logged in successfully!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid credentials");
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
          <input
            type="email"
            value={state.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            className="border rounded p-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-medium">Password</span>
          <input
            type="text"
            value={state.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            className="border rounded p-2"
            required
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
        Don't have an Account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-orange-600 font-semibold underline"
        >
          Register
        </button>
      </p>
    </div>
  );
}
