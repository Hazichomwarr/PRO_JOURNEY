// You can use this to abstract label + input logic
export function InputField({ label, name, value, onChange, error, type="text", }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="font-semibold mb-1 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded p-2 w-full"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

