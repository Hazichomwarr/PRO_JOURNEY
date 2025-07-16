export const RadioFieldWrapper = ({ children, error }) => {
  return (
    <div className=" mt-4 p-2 font-medium shadow bg-white">
      <fieldset>
        <legend>Choose your Preferred Contact Method:</legend>
        <div className="flex justify-center">{children}</div>
      </fieldset>
      {error && <p className="text-red-400 font-medium">{error}</p>}
    </div>
  );
};
