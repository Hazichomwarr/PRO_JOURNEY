// pages/CoachRegistration.tsx
import { useEffect, useState } from "react";
import AvailabilitySelect from "../components/layout/coach/AvailabilitySelect";
import ExpertiseSelector from "../components/layout/coach/ExpertiseSelector";
import UpgradeRoleModal from "../components/layout/UpgradeRoleModal";
import { useCoachRegistration } from "../hooks/useCoachRegistration";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import InputField from "../components/ui/InputField";
import GoBackButton from "../components/ui/GoBackButton";
import TextAreaField from "../components/ui/TextAreaField";

export default function CoachRegistration() {
  const {
    state,
    handleUpgrade,
    handleChange,
    handleSubmit,
    toggleExpertise,
    handleAvailabilityChange,
  } = useCoachRegistration();
  const role = useAuthStore((s) => s.user?.role);
  const navigate = useNavigate();

  const [showUpgradeModal, setShowUpgradeModal] = useState(role !== "coach");

  // ✅ Reactively navigate once Zustand finishes updating
  useEffect(() => {
    if (role === "coach") {
      navigate("/coaches/new");
    }
  }, [role]);
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Become a Coach
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {/* <textarea
            rows={4}
            name="bio"
            id="bio"
            value={state.values.bio}
            onChange={handleChange("bio")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none col-span-2"
            placeholder="Write a short catching bio about yourself here..."
          ></textarea> */}

          <TextAreaField
            value={state.values.bio}
            changeFn={handleChange("bio")}
            placeholder="Write a short catching bio about yourself here..."
          />
          <InputField
            type="number"
            placeholder="Hourly Rate"
            value={state.values.hourlyRate ?? ""}
            changeFn={handleChange("hourlyRate")}
          />

          {/* Expertise */}
          <ExpertiseSelector
            selected={state.values.expertise}
            onToggle={toggleExpertise}
          />
          <AvailabilitySelect
            selected={state.values.availability}
            onChange={handleAvailabilityChange}
          />
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
        >
          {state.loading ? "Saving..." : "Submit"}
        </button>

        {/* Go Back Button */}
        <GoBackButton />
      </form>

      {showUpgradeModal && (
        <UpgradeRoleModal
          onConfirm={() => handleUpgrade(() => setShowUpgradeModal(false))}
          onCancel={() => {
            setShowUpgradeModal(false);
            navigate("/dashboard");
          }}
        />
      )}
    </div>
  );
}
