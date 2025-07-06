import { useState, useEffect } from "react";

export function useForm(initialValues, validate, onSubmit) {
    const [formData, setFormData] = useState(initialValues)
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    //the useEffect is acting up: it shows every field red at once so I commented it out
    useEffect(() => {
        const validationErrors = validate(formData);
        const touchedErrors = Object.keys(validationErrors)
            .filter(key => touched[key])
            .reduce((acc, key) => ({ ...acc, [key]: validationErrors[key] }), {});
        setErrors(touchedErrors);
    }, [formData, touched]);


    function handleChange(e) {
        const { name } = e.target;
        const value = e.target.value.trimStart()
        setFormData(prev => ({ ...prev, [name]: value }));
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
            setFormData(initialValues)
            setTouched({});
            setErrors({});

        }else {
            setErrors(validationErrors);
            setIsSubmitted(false)
        }
    }

    const formIsValid = Object.keys(errors).length === 0 && Object.values(formData).every(Boolean)

    return {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitted,
        formIsValid,
    };
}