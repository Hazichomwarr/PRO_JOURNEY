import InputField from "../components/ui/InputField";
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
          Create Your User Account
        </h2>
        {/* --- First & Last Name --- */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            value={state.firstName}
            changeFn={handleChange("firstName")}
            type="text"
            placeholder="First Name"
          />
          <InputField
            value={state.lastName}
            changeFn={handleChange("lastName")}
            type="text"
            placeholder="Last Name"
          />
        </div>
        {/* --- Email & Phone --- */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            value={state.email}
            changeFn={handleChange("email")}
            type="email"
            placeholder="Email"
          />

          <InputField
            value={state.phone}
            changeFn={handleChange("phone")}
            type="tel"
            placeholder="Phone"
          />
        </div>
        {/* --- Address City & State --- */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            value={state.city}
            changeFn={handleChange("city")}
            type="text"
            placeholder="City"
          />

          <InputField
            value={state.state}
            changeFn={handleChange("state")}
            type="text"
            placeholder="State/Country"
          />
        </div>
        {/* --- Birth Date --- */}
        <label className="flex items-center gap-2 text-gray-600">
          DOB
          <InputField
            value={state.birthDate}
            changeFn={handleChange("birthDate")}
            type="date"
            placeholder="Birth Date"
          />
        </label>
        {/* --- Role --- */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium">
            How do you want to use TouchPoint?
            <select
              value={state.role}
              onChange={handleChange("role")}
              className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Role</option>
              <option value="coach">Coach - help others grow</option>
              <option value="buddy">Buddy - find someone to grow with</option>
              <option value="seeker">Seeker - Looking for help</option>
            </select>
          </label>
        </div>
        {/* --- Passwords --- */}
        <InputField
          value={state.password}
          changeFn={handleChange("password")}
          type="text"
          placeholder="Password"
        />
        <InputField
          value={state.confirmPassword}
          changeFn={handleChange("confirmPassword")}
          type="text"
          placeholder="Confirm Password"
        />
        ---IMAGE/AVATAR---
        <label className=" flex items-center gap-6 text-gray-700">
          <span>Add Picture (or an Avatar) </span>
          <InputField
            value={state.image || ""} //<- Type 'string | File' is not assignable to type 'string | number | null | undefined'.
            changeFn={handleChange("image")}
            type="file"
          />
        </label>
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
