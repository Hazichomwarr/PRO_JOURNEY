import React from "react";
import { useState } from "react";
import { InputField } from "./InputField";

export const Form = () => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {}; //defining the errors object to store them

    // validations rules
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.includes("@") && !formData.email.includes(".")) {
      newErrors.email = "Email must be valid";
    }
    if (!formData.age || isNaN(formData.age)) {
      newErrors.age = "Age must be a number";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; //stop if errors
    }

    //no errors - do something
    console.log("Submitted", formData);
    alert("Form submitted successfully ✅");
  };

  return (
    <>
      <InputField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
      <button onClick={() => console.log(formData)} className="btn mt-4">
        Submit
      </button>
    </>
  );
};
