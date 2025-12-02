// utils/validator.js
const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().allow(""), // optional
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref("password"),
  phone: Joi.string().allow(""),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  birthDate: Joi.date().less("now").allow(""),
  image: Joi.string().allow(""),
  interest: Joi.string().allow(""),
  role: Joi.string().required(),
  bio: Joi.string().allow(""),
  resetToken: Joi.string().allow(""),
  resetTokenExpires: Joi.number().allow(),
});

module.exports = { validateSignup: validator(signupSchema) };
