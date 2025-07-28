export const TextAreaField = ({
  label,
  name,
  value,
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
      <textarea
        id={name}
        name={name}
        rows="5"
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
