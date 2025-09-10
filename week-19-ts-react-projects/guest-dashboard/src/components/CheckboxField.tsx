//components/CheckboxField.tsx
import type { GuestFormEvent } from "../hooks/useGuestForm";
interface CheckBoxProps {
  label: string;
  name: string;
  type?: string;
  checked: boolean;
  error?: string;
  onChange: (e: GuestFormEvent) => void;
}

export default function CheckboxField({
  label,
  name,
  type = "checkbox",
  checked,
  error,
  onChange,
}: CheckBoxProps) {
  return (
    <div className="w-full">
      <label className="flex justify-center items-center gap-2 text-gray-700 mt-6 input">
        {label}
        <input
          type={type}
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
