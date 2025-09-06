import { InputMask } from "@react-input/mask";
interface InputfieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

      {name === "phone" ? (
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder || "000-000-0000"}
          className={`w-full rounded-lg p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500`}
        />
      ) : (
        <input
          className={`w-full rounded-lg p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500`}
          name={name}
          id={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
