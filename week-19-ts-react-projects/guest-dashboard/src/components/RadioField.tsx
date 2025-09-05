//components/RadioField.tsx
import React from "react";
import type { category } from "../models/guest";

interface RadioFieldProps {
  name: string;
  value: string;
  type?: string;
  error?: string;
  categories: category[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioField({
  name,
  value,
  categories,
  type = "radio",
  onChange,
}: RadioFieldProps) {
  return (
    <div className="flex items-center gap-4 input w-full">
      <p className="font-medium">Category</p>
      {categories.map((cat) => (
        <label
          key={cat}
          className="font-medium text-xs text-gray-700 flex items-center gap-1"
        >
          <input
            type={type}
            name={name}
            value={cat}
            checked={value === cat}
            onChange={onChange}
            className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          {cat}
        </label>
      ))}
    </div>
  );
}
