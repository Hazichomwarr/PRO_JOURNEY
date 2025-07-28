export const RadioField = ({
  label,
  name,
  value,
  checked,
  onChange,
  onBlur,
}) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="mr-2"
      />
      <label htmlFor={value} className="font-medium">
        {label}
      </label>
    </div>
  );
};
