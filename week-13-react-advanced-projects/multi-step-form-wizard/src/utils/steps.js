// 1. Step field requirements
export const steps = {
  1: ["name", "email", "phone"],
  2: ["contactMethod"], // optional: "isSubscribe"
  3: [], // message is optional
};

// 2. Validation logic
export const validation = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Email must be valid";
  }

  if (!/^\d{3}-?\d{3}-?\d{4}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.contactMethod) {
    errors.contactMethod = "Please select a contact method";
  }

  return errors;
};
