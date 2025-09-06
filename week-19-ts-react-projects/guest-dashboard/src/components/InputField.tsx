//components/InputField.tsx
interface InputfieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: InputfieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        className={`w-full rounded-lg p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-blue-500`}
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={name === "phone" ? "000-000-0000" : ""}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
