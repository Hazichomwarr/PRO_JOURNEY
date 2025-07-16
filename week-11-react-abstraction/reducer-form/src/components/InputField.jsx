export const InputField = ({
  label,
  value,
  onChange,
  onBlur,
  isTouched,
  name,
  type,
  error,
}) => {
  const hasError = isTouched && !!error;

  return (
    <>
      <label htmlFor={name} className="m-2 font-medium">
        {label}
      </label>
      <input
        className={`border py-2 px-4 transition-all duration-200 ${
          isTouched ? (hasError ? "border-red-300" : "border-green-300") : ""
        }`}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      {hasError && <p className="text-red-400 font-medium">{error}</p>}
    </>
  );
};
