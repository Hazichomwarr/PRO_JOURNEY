import type React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        className="input"
        id={name}
        name={name}
        type={type}
        placeholder={`${name === "name" ? "Enter name" : "Enter Email"}`}
        value={value}
        onChange={onChange}
        required
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
