// //components/layout/coach/AvailabilityPicker.tsx
// interface Props {
//   availability: { [day: string]: string[] };
//   onToggleSlot: (day: string, slot: string) => void;
// }

// const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const SLOTS = ["09–11", "11–13", "14–16", "16–18"];

// export default function AvailabilityPicker({
//   availability,
//   onToggleSlot,
// }: Props) {
//   return (
//     <div className="space-y-2">
//       <p className="text-gray-600 font-medium">Set your weekly availability</p>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm border-separate [border-spacing:0.25rem] p-2">
//           <thead>
//             <tr>
//               <th></th>
//               {SLOTS.map((slot) => (
//                 <th key={slot} className="text-gray-700 p-2">
//                   {slot}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {DAYS.map((day) => (
//               <tr key={day}>
//                 <td className="font-medium text-gray-700 p-2">{day}</td>
//                 {SLOTS.map((slot) => {
//                   const selected = availability[day]?.includes(slot);
//                   return (
//                     <td
//                       key={slot}
//                       onClick={() => onToggleSlot(day, slot)}
//                       className={`cursor-pointer text-center p-2 m-2 rounded ${
//                         selected
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 hover: bg-blue-100"
//                       }`}
//                     >
//                       {selected ? "✓" : ""}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// components/layout/coach/AvailabilitySelect.tsx
import React from "react";

interface Props {
  selected: string[];
  onChange: (slots: string[]) => void;
}

const SLOT_OPTIONS = [
  "Mon 09–11",
  "Mon 11–13",
  "Tue 09–11",
  "Wed 14–16",
  "Thu 16–18",
  "Fri 09–11",
  "Sat 11–13",
  "Sun 14–16",
];

export default function AvailabilitySelect({ selected, onChange }: Props) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    onChange(values);
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">Select availability</label>
      <select
        multiple
        value={selected}
        onChange={handleSelect}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        {SLOT_OPTIONS.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500">
        Hold Ctrl (Windows) or Cmd (Mac) to select multiple slots
      </p>
    </div>
  );
}
