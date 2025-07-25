export const ValidationSummary = ({ errors }) => {
  const errorList = Object.entries(errors).filter(([__, msg]) => !!msg);

  if (errorList.length === 0) return null;

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      role="alert"
      aria-live="assertive"
    >
      <strong className="font-bold">Please fix the following:</strong>
      <ul className="list-disc list-inside mt-2">
        {errorList.map(([field, message]) => (
          <li key={field}>
            <span className="capitalize">{field}:</span> {message}
          </li>
        ))}
      </ul>
    </div>
  );
};
