export const TextAreaField = ({
  label,
  value,
  onChange,
  onBlur,
  isTouched,
  name,
  error,
}) => {
  const hasError = isTouched && !!error;

  return (
    <>
      <label htmlFor={name} className="m-2 font-medium">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        className={`border py-2 px-4 transition-all duration-200 ${
          isTouched ? (hasError ? "border-red-300" : "border-green-300") : ""
        }`}
        value={value}
      ></textarea>
      {hasError && <p className="text-red-400 font-medium">{error}</p>}
    </>
  );
};
