import { useRegisterForm } from "../hooks/useRegisterForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { state, handleChange, handleSubmit } = useRegisterForm();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create Your Account
        </h2>

        {/* --- First & Last Name --- */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={state.firstName}
            onChange={handleChange("firstName")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={state.lastName}
            onChange={handleChange("lastName")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* --- Email --- */}
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange("email")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* --- Phone --- */}
        <input
          type="tel"
          placeholder="Phone"
          value={state.phone}
          onChange={handleChange("phone")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* --- Address City & State --- */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City"
            value={state.city}
            onChange={handleChange("city")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="State/Country"
            value={state.state}
            onChange={handleChange("state")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* --- Birth Date --- */}
        <label className="flex items-center gap-2 text-gray-600">
          DOB
          <input
            type="date"
            placeholder="Birth Date"
            value={state.birthDate}
            onChange={handleChange("birthDate")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </label>

        {/* --- Role --- */}
        <select
          value={state.role}
          onChange={handleChange("role")}
          className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Role</option>
          <option value="coach">Coach</option>
          <option value="seeker">Seeker</option>
        </select>

        {/* --- Passwords --- */}
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange("password")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={handleChange("confirmPassword")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
        >
          Register
        </button>
      </form>
      <p className="text-center pb-2">
        Already Have an Account ?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-orange-600 font-semibold underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
