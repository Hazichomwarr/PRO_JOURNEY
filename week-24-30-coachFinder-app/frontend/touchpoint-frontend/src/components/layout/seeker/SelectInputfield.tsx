import { ChangeEvent } from "react";
import { TypeRole } from "../../../models/user";

interface Props {
  value?: string;
  label?: string;
  error?: string | undefined;
  changeFn: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const roleOptions: Record<string, string>[] = [
  { value: "", label: "Select Role" },
  { value: "seeker", label: "Seeker - Looking for help" },
  { value: "coach", label: "Coach - help others grow" },
  { value: "buddy", label: "Buddy - find someone to grow with" },
];

export default function SelectInputfield({
  value,
  label,
  error,
  changeFn,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium">
        {label}
        <select
          value={value}
          onChange={changeFn}
          className={`w-full border p-2 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } `}
        >
          {roleOptions.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
