import { InputField } from "./InputField";
import { useForm } from "../hooks/useform";

export const Form = () => {
  const initialValues = ({ name: "", email: "", age: "" });

  // validations rules
  const validate = (values) => {
    const newErrors = {}
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Email must be valid";
    }
    if (!values.age || isNaN(values.age)) {
      newErrors.age = "Age must be a number";
    }
    
      return newErrors;
    }

    const onSubmit = (data) => {
      console.log("Submitted", data);
      // alert("Form submitted successfully ✅");
    }
    
    const { formData, errors, touched,handleChange, handleBlur, handleSubmit, isSubmitted} =
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
        error={errors.name || touched.name}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email || touched.email}
      />
      <InputField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
       onBlur={handleBlur}
        error={errors.age || touched.age}
      />
      <button onClick={() => console.log(formData)} className="btn mt-4" disabled={isSubmitted}>
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
