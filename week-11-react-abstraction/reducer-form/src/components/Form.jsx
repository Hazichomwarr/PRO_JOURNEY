import { InputField } from "./InputField";
import { useFormReducer } from "../hooks/useFormReducer";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextAreaField } from "./TextAreaField";
import { RadioFieldWrapper } from "./RadioFieldWrapper";

const initialState = {
  name: "",
  email: "",
  message: "",
  isSubscribe: false,
  contactMethod: "",
  phone: "",
  isformReady: false,
};

const validation = (values) => {
  const newErrors = {};
  if (!values.name.trim()) {
    newErrors.name = "Name is required";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    newErrors.email = "Email must be valid";
  }
  if (!values.phone || isNaN(values.phone) || values.phone <= 10) {
    newErrors.phone = "Please enter valid phone number of 10 digits";
  }
  if (!values.contactMethod) {
    newErrors.contactMethod = "Please select a preferred contact method";
  }
  return newErrors;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "update": {
      return { ...state, [action.field]: action.value };
    }
    case "error": {
      console.log("error");
      return { ...state, isformReady: false };
    }
    case "ready": {
      console.log("form ready");
      return { ...state, isformReady: true };
    }

    case "reset": {
      return initialState;
    }
    default:
      return state;
  }
};

export const Form = () => {
  const { formState, handleChange, handleSubmit } = useFormReducer(
    formReducer,
    initialState,
    validation
  );

  return (
    <form
      onSubmit={handleSubmit}
      action="post"
      className="max-w-md my-6 mx-auto p-4 border bg-gray-100 rounded shadow flex flex-col "
    >
      <InputField
        label="Full Name"
        value={formState.name}
        type="text"
        onChange={(e) => handleChange(e, "name")}
        name="name"
      />
      <InputField
        label="Email"
        value={formState.email}
        type="email"
        onChange={(e) => handleChange(e, "email")}
        name="email"
      />
      <InputField
        label="Phone Number"
        value={formState.phone}
        type="text"
        onChange={(e) => handleChange(e, "phone")}
        name="phone"
      />
      <CheckboxField
        label="Subscribe to Newsletter ?"
        checked={formState.isSubscribe}
        onChange={(e) => handleChange(e, "isSubscribe")}
        type="checkbox"
        name="isSubscribe"
      />
      <RadioFieldWrapper>
        <RadioField
          label="Email"
          type="radio"
          name="contactMethod"
          value="email"
          checked={formState.contactMethod === "email"}
          onChange={(e) => handleChange(e, "contactMethod")}
        />
        <RadioField
          label="Phone"
          type="radio"
          name="contactMethod"
          value="phone"
          checked={formState.contactMethod === "phone"}
          onChange={(e) => handleChange(e, "contactMethod")}
        />
      </RadioFieldWrapper>
      <TextAreaField
        label="Message"
        id="message"
        name="message"
        onChange={(e) => handleChange(e, "message")}
        value={formState.message}
      />
      <button>Submit</button>

      {formState.isformReady && (
        <p className="bg-white p-4 mt-4 text-green-800">
          Form Submitted successfully!
        </p>
      )}
    </form>
  );
};
