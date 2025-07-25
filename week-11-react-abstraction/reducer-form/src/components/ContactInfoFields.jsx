import { InputField } from "./InputField";

export const ContactInfoFields = ({
  fields,
  errors,
  touched,
  onChange,
  onBlur,
  pattern,
}) => {
  return (
    <>
      <InputField
        label="Full Name"
        name="name"
        type="text"
        value={fields.name}
        onChange={(e) => onChange(e, "name")}
        onBlur={(e) => onBlur(e, "name")}
        error={errors.name}
        isTouched={touched.name}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={fields.email}
        onChange={(e) => onChange(e, "email")}
        onBlur={(e) => onBlur(e, "email")}
        error={errors.email}
        isTouched={touched.email}
      />
      <InputField
        label="Phone"
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={fields.phone}
        onChange={(e) => onChange(e, "phone")}
        onBlur={(e) => onBlur(e, "phone")}
        error={errors.phone}
        isTouched={touched.phone}
      />
    </>
  );
};
