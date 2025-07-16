export const CheckboxField = ({
  label,
  checked,
  name,
  type,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="m-2 font-medium flex justify-center gap-2 my-6">
      <label htmlFor={name}>{label}</label>
      <input
        className="border py-2 px-4"
        type={type}
        id={name}
        checked={checked}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-400 font-medium">{error}</p>}
    </div>
  );
};
