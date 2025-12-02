//components/ui/TextAreaField.tsx
import { ChangeEvent } from "react";

interface Props {
  type?: string;
  placeholder?: string;
  value?: string | number | undefined | null;
  error?: string | number | undefined | null;
  name?: string | undefined;
  label?: string | undefined;

  changeFn: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function TextAreaField({
  value,
  changeFn,
  placeholder,
  error,
  label,
}: Props) {
  return (
    <label className="mt-2 flex flex-col items-center gap-1 text-gray-700 w-full">
      <span className="text-xl">{label}</span>
      <textarea
        rows={4}
        name="bio"
        id="bio"
        value={value || ""}
        onChange={changeFn}
        placeholder={placeholder || ""}
        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none col-span-2 w-full"
      ></textarea>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </label>
  );
}
