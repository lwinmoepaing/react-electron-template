import { ErrorMessage, useFormikContext } from "formik";
import React from "react";
import FormErrorMessage from "./FormErrorMessage";

export default function FormField(props) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();

  const { name, ...rest } = props;

  return (
    <div>
      <input
        name={name}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name)}
        {...rest}
      />
      {touched[name] && errors[name] && (
        <ErrorMessage name={name} render={FormErrorMessage} />
      )}
    </div>
  );
}
