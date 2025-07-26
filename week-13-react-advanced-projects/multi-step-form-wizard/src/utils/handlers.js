export const handleChange = (e, dispatch) => {
  const { name, type, value, checked } = e.target;

  dispatch({
    type: "update",
    payload: {
      field: name,
      value: type === "checkbox" ? checked : value,
    },
  });
};

export const handleBlur = (e, dispatch, validate, fields) => {
  const field = e.target.name;

  dispatch({ type: "touch", payload: { field } });

  const validationErrors = validate(fields);
  const fieldError = validationErrors[field] || "";

  dispatch({ type: "validateField", payload: { field, error: fieldError } });
};
