import React from 'react'
import { InputField } from './InputField'
const [formValues, setFormValues] = usestate({name: ""})
const [formErrors, setFormErrors] = usestate({name: ""})
export const Form = () => {
  return (
    <form>
      <InputField
        label="Email"
        name="email"
        value={formValues.text}
        onChange={handleChange}
        error={formErrors.email}
      />
    </form>
  )
}
