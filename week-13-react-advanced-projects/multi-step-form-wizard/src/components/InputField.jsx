export const InputField = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  onBlur,
  error,
  isTouched,
}) => {
  const hasError = isTouched && !!error;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full border px-3 py-2 rounded ${
          hasError ? "border-red-500 outline-red-300" : "focus:outline-blue-500"
        }`}
      />
      {hasError && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
