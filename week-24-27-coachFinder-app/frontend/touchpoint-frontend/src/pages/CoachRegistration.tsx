// pages/CoachRegistration.tsx
import { useCoachRegistration } from "../hooks/useCoachRegistration";

export default function CoachRegistration() {
  const { state, handleChange, handleSubmit } = useCoachRegistration();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Register to become a Coach
        </h2>

        {/* HourlyRate + Aailability */}
        <div className="grid grid-cols-2 gap-3">
          <textarea
            rows={4}
            name="bio"
            id="bio"
            value={state.bio}
            onChange={handleChange("bio")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none col-span-2"
            placeholder="Write a short catching bio about yourself here..."
          ></textarea>
          <input
            type="number"
            placeholder="Hourly Rate"
            value={state.hourlyRate!}
            onChange={handleChange("hourlyRate")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text" //not sure it should be text
            placeholder="Availability"
            value={state.availability}
            onChange={handleChange("availability")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Expertise */}
        <div className="space-y-2">
          <label className="text-gray-700">
            Choose your domain(s)
            <select
              value={state.expertise}
              onChange={handleChange("expertise")}
              className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {/* light way for now -- awaiting your profesional options */}
              <option value="">Select Expertise</option>
              <option value="Motivation">I Can motivate people</option>
              <option value="Finance">
                I'll help you reach your financial goals
              </option>
              <option value="Coding">I am coder geek</option>
            </select>
          </label>
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
