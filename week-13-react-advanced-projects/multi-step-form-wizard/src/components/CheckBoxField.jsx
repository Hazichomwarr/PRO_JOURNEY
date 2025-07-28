export const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="mr-2"
      />
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      {error && <p className="text-sm text-red-500 ml-4">{error}</p>}
    </div>
  );
};
