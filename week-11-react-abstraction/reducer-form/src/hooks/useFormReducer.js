import { useReducer } from "react";

// export function useFormReducer(formReducer, initialState, validation) {
//   const [formState, dispatch] = useReducer(formReducer, initialState);

//   const handleChange = (e, fieldName) => {
//     const val =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;

//     dispatch({
//       type: "update",
//       field: fieldName,
//       value: val,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validation(formState);
//     if (
//       Object.keys(errors).length === 0 &&
//       Object.values(formState).every(Boolean)
//     ) {
//       dispatch({ type: "ready" });
//     } else {
//       dispatch({ type: "error" });
//     }
//   };
//   return { handleChange, handleSubmit, formState };
// }

export function useFormReducer(formReducer, initialState, validate) {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e, fieldName) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    dispatch({
      type: "update",
      field: fieldName,
      value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formState);

    const isFormComplete = Object.values(formState).every(
      (val) => val !== "" && val !== null
    );

    if (Object.keys(errors).length === 0 && isFormComplete) {
      dispatch({ type: "ready" });
    } else {
      dispatch({ type: "error", payload: errors });
    }
  };

  return { handleChange, handleSubmit, formState };
}
