interface CheboxFieldProps {
  label: string;
  name: string;
  type?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function CheckboxField({
  label,
  name,
  checked,
  onChange,
  error,
}: CheboxFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={error ? "border-red-500" : ""}
        />
        {label}
      </label>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
