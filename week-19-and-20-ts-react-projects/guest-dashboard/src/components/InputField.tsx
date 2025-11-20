import type { GuestFormEvent } from "../hooks/useGuestForm";

interface InputfieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: GuestFormEvent) => void;
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: InputfieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        placeholder={name === "phone" ? "Phone: 000-000-0000" : placeholder}
        className={`w-full rounded-lg p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-blue-500`}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
