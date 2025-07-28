export const RadioFieldWrapper = ({ label, children, error }) => {
  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">{label}</p>
      <div className="flex flex-col gap-1">{children}</div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
