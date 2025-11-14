//components/ui/InputField.tsx
import { ChangeEvent } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  value: string | number | undefined | null;
  changeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  value,
  changeFn,
  type,
  placeholder,
}: Props) {
  return (
    <input
      type={type || "text"}
      placeholder={placeholder || ""}
      value={value ?? ""}
      onChange={changeFn}
      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none`}
    />
  );
}
