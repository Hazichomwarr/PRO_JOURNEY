//components/layout/coach/EditForm.tsx
import React from "react";
import ExpertiseSelector from "./ExpertiseSelector";
import { CoachDetail } from "../../../hooks/useEditForm";
import AvailabilitySelect from "./AvailabilitySelect";

interface EditFormProps {
  coach: {
    bio: string;
    expertise: string[];
    availability: string[];
    hourlyRate: number;
  };
  changeFn: (
    field: keyof CoachDetail
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  submitFn: (e: React.FormEvent) => void;
  dispatch?: React.Dispatch<any>; // optional if using reducer
}

const AVAILABILITY_OPTIONS = [
  "Mon 9–11",
  "Mon 14–16",
  "Tue 9–11",
  "Tue 14–16",
  "Wed 9–11",
  "Wed 14–16",
  "Thu 9–11",
  "Thu 14–16",
  "Fri 9–11",
  "Fri 14–16",
];

export default function EditForm({
  coach,
  changeFn,
  submitFn,
  dispatch,
}: EditFormProps) {
  const { bio, expertise, availability, hourlyRate } = coach;

  const handleExpertiseToggle = (value: string) => {
    if (dispatch) {
      dispatch({ type: "TOGGLE_EXPERTISE", value });
    } else {
      // fallback for non-reducer mode
      const newExpertise = expertise.includes(value)
        ? expertise.filter((e) => e !== value)
        : [...expertise, value];

      // manually trigger changeFn
      const fakeEvent = {
        target: { value: newExpertise.join(",") },
      } as React.ChangeEvent<HTMLSelectElement>;

      changeFn("expertise")(fakeEvent);
    }
  };

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    if (dispatch) {
      dispatch({ type: "TOGGLE_AVAILABILITY", values: selected });
    } else {
      changeFn("availability")(e);
    }
  };

  return (
    // <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    //   <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative border border-gray-100">
    <form onSubmit={submitFn} className="space-y-4 text-gray-700">
      {/* BIO */}
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={changeFn("bio")}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>

      {/* HOURLY RATE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Hourly Rate ($)
        </label>
        <input
          type="number"
          value={hourlyRate}
          onChange={changeFn("hourlyRate")}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* EXPERTISE SELECTOR */}
      <div>
        <label className="block text-sm font-medium mb-1">Expertise</label>
        <ExpertiseSelector
          selected={expertise}
          onToggle={handleExpertiseToggle}
        />
      </div>

      {/* AVAILABILITY SELECT */}
      <AvailabilitySelect
        onChange={(slots) => {
          if (dispatch) {
            dispatch({ type: "TOGGLE_AVAILABILITY", values: slots });
          } else {
            const fakeEvent = {
              target: { value: slots.join(",") },
            } as React.ChangeEvent<HTMLSelectElement>;
            changeFn("availability")(fakeEvent);
          }
        }}
        selected={AVAILABILITY_OPTIONS}
      />
      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
    //   </div>
    // </div>
  );
}
