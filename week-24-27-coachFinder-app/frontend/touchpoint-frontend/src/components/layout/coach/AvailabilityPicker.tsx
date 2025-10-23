//components/layout/coach/AvailabilityPicker.tsx

// components/AvailabilityPicker.tsx
import React from "react";

interface Props {
  availability: { [day: string]: string[] };
  onToggleSlot: (day: string, slot: string) => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["09–11", "11–13", "14–16", "16–18"];

export default function AvailabilityPicker({
  availability,
  onToggleSlot,
}: Props) {
  return (
    <div className="space-y-2">
      <p className="text-gray-600 font-medium mt-4 text-center">
        Set your weekly availability
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              {SLOTS.map((slot) => (
                <th key={slot} className="p-2 text-gray-500">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day}>
                <td className="font-medium text-gray-700 p-2">{day}</td>
                {SLOTS.map((slot) => {
                  const selected = availability[day]?.includes(slot);
                  return (
                    <td
                      key={slot}
                      onClick={() => onToggleSlot(day, slot)}
                      className={`cursor-pointer text-center p-2 rounded ${
                        selected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-blue-100"
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
