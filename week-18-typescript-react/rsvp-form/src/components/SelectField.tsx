import type React from "react";
import type { Meal } from "../models/meal";

interface SelectFieldProps {
  label: string;
  name: string;
  value: Meal;
  options: readonly Meal[]; //only accepts valid meals
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  options,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-sm text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`border rounded p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
