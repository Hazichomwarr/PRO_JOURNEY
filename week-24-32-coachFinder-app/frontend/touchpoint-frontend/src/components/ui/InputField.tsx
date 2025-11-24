//components/ui/InputField.tsx
import { ChangeEvent, useState } from "react";
import ViewPasswordValue from "./ViewPasswordValue";

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
  const [isOpen, setIsOpen] = useState(false);

  const isPasswordField = ["password", "confirmPassword"].includes(name || "");

  //Safe guarding input type
  const inputType = isPasswordField ? (isOpen ? "text" : "password") : type;

  const isFile = type === "file";

  return (
    <div className="felx flex-col gap-1 w-full">
      <div className="relative w-full">
        <input
          type={inputType}
          placeholder={name === "phone" ? "Phone: 000-000-0000" : placeholder}
          {...(!isFile ? { value: value ?? "" } : {})} // ⬅ do NOT control file input
          onChange={changeFn}
          className={`w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } `}
        />
        {isPasswordField && (
          <ViewPasswordValue isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
