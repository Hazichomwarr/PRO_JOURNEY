import { useState, useEffect } from "react";

export function useForm(initialValues, validate, onSubmit) {
    const [formData, setFormData] = useState(initialValues)

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData( prev => ({...prev, [name]: value}))
    }

    const handleBlur = (e) => {
        const {name} = e.target;
        setTouched(prev => ({...prev, [name]: true}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
             setIsSubmitted(true);
            onSubmit(formData)
            // setFormData(initialValues)
        } else {
            setErrors(validationErrors);
            setIsSubmitted(false);
        }
    }

    useEffect(() => {
  if (Object.keys(touched).length > 0) {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  }
}, [formData]);


    return {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitted,
};
}