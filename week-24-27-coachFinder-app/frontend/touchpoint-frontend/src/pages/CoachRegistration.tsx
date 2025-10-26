// pages/CoachRegistration.tsx
import AvailabilityPicker from "../components/layout/coach/AvailabilityPicker";
import ExpertiseSelector from "../components/layout/coach/ExpertiseSelector";
import UpgradeRoleModal from "../components/layout/UpgradeRoleModal";
import { useCoachRegistration } from "../hooks/useCoachRegistration";

export default function CoachRegistration() {
  const {
    state,
    showUpgradeModal,
    setShowUpgradeModal,
    handleUpgrade,
    handleChange,
    handleSubmit,
    toggleExpertise,
    toggleAvailability,
  } = useCoachRegistration();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Become a Coach
        </h2>
        <div className="flex flex-col gap-4">
          <textarea
            rows={4}
            name="bio"
            id="bio"
            value={state.values.bio}
            onChange={handleChange("bio")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none col-span-2"
            placeholder="Write a short catching bio about yourself here..."
          ></textarea>
          <input
            type="number"
            placeholder="Hourly Rate"
            value={state.values.hourlyRate ?? ""}
            onChange={handleChange("hourlyRate")}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Expertise */}
        <ExpertiseSelector
          selected={state.values.expertise}
          onToggle={toggleExpertise}
        />
        <AvailabilityPicker
          availability={state.values.availability}
          onToggleSlot={toggleAvailability}
        />

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
        >
          Submit
        </button>
        {showUpgradeModal && (
          <UpgradeRoleModal
            onConfirm={handleUpgrade}
            onCancel={() => setShowUpgradeModal(false)}
          />
        )}
      </form>
    </div>
  );
}
