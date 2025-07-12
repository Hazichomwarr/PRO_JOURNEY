export const TextAreaField = ({ label, value, onChange, name }) => {
  return (
    <>
      <label htmlFor={name} className="m-2 font-medium">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        className="border py-2 px-4"
        value={value}
      ></textarea>
    </>
  );
};
