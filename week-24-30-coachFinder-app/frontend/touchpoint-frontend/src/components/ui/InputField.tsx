//components/ui/InputField.tsx
import { ChangeEvent } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  value?: string | number | undefined | null;
  changeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  value,
  changeFn,
  type,
  placeholder,
}: Props) {
  const isFile = type === "file";

  return (
    <input
      type={type || "text"}
      placeholder={placeholder || ""}
      {...(!isFile ? { value: value ?? "" } : {})} // ⬅ do NOT control file input
      onChange={changeFn}
      className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none`}
    />
  );
}
