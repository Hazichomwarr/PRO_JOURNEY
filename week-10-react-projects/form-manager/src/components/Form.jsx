import { InputField } from "./InputField";
import { useForm } from "../hooks/useform";

function containsSpecialChars(str) {
  // The backslashes before some characters like \-, \[, \], \{, \}, \\, \|, \. are for escaping them
  // because they have special meaning in regular expressions.
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export const Form = () => {
  const initialValues = ({ name: "", email: "", age: "" , password: ""});

  // validations rules
  const validate = (values) => {
    const newErrors = {}
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Email must be valid";
    }
    if (!values.age || isNaN(values.age) || !values.age <= 0) {
      newErrors.age = "Age must be a number and greater than zero";
    }
    if ((!values.password.trim().length >= 6) || (!/\d/.test(values.password)) || (!containsSpecialChars(values.password))) {
      newErrors.password = `Password must be at least 6 chars with at least one number and at least one special character`
    }
    
      return newErrors;
    }

    const onSubmit = (data) => {
      console.log("Submitted", data);
      // alert("Form submitted successfully ✅");
    }
    
    const { formData, errors, touched,handleChange, handleBlur, handleSubmit, isSubmitted, formIsValid} =
  useForm(initialValues, validate, onSubmit);

  return (
    <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border bg-white rounded"
      >
      <InputField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <InputField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
       onBlur={handleBlur}
        error={errors.age}
        touched={touched.age}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />
      <button className={`btn mt-4 ${!formIsValid ? 'opacity-50 cursor-not-allowed text-stone-900' : ''}`} disabled={!formIsValid}>
       Submit
      </button>
      {isSubmitted && (
        <p className="text-green-600 font-semibold text-center mt-4">
          ✅ Form submitted successfully!
        </p>
      )}
    </form>
  );
};
