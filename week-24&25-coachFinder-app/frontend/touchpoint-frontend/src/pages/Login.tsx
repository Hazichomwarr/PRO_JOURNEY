//pages/login.tsx
import { useReducer, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axiosClient";
import { useAuthStore } from "../store/authStore";

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
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/login", state);
      const { user, accessToken } = res.data;

      login(user, accessToken);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
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
