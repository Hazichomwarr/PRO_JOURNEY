export function InputField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="font-semibold mb-1 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border rounded p-2 w-full ${error ? 'border-red-200' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
