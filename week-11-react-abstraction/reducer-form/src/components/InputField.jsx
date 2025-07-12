export const InputField = ({ label, value, onChange, name, type }) => {
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
        onChange={onChange}
        name={name}
      />
    </>
  );
};
