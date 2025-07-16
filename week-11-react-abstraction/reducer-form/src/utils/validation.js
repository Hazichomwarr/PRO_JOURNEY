// utils/validation.js
export const validate = (fields) => {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required";
  }

  if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
    errors.email = "Email must be valid";
  }

  if (!fields.phone || isNaN(fields.phone) || fields.phone.length !== 10) {
    errors.phone = "Enter valid 10-digit phone number";
  }

  if (!fields.contactMethod) {
    errors.contactMethod = "Select a preferred contact method";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
};
