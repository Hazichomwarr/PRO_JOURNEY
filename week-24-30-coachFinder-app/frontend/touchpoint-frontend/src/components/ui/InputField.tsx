//components/ui/InputField.tsx
import { ChangeEvent } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  value?: string | number | undefined | null;
  error?: string | number | undefined | null;
  name?: string | undefined;
  changeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  value,
  changeFn,
  type,
  placeholder,
  error,
  name,
}: Props) {
  const isFile = type === "file";

  return (
    <div className="felx flex-col gap-1 w-full">
      <input
        type={type || "text"}
        placeholder={name === "phone" ? "Phone: 000-000-0000" : placeholder}
        {...(!isFile ? { value: value ?? "" } : {})} // ⬅ do NOT control file input
        onChange={changeFn}
        className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } `}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
