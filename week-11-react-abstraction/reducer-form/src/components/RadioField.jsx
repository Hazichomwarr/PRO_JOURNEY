export const RadioField = ({ label, value, name, checked, onChange, type }) => {
  return (
    <>
      <label htmlFor={name} className="m-2 font-medium">
        {label}
      </label>
      <input
        className="border py-2 px-4"
        type={type}
        id={name}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};
