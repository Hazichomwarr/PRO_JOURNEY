import React from 'react'

export const DropdownField = ({label, name, value, onChange, onBlur, error,}) => {
  return (
    <div className="mb-4">
  <label htmlFor="color" className="font-semibold mb-1 block">{label}</label>
  <select
    id={name}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className={`border rounded p-2 w-full ${error ? 'border-red-200' : 'border-gray-300'}`}
  >
    <option value="">Select color</option>
    <option value="blue">Blue</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
  </select>
  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
</div>

  )
}
