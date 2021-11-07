import { ErrorMessage, useFormikContext } from "formik";
import React from "react";
import FormErrorMessage from "./FormErrorMessage";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function FormField(props) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();

  const { name, ...rest } = props;

  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <TextField
        name={name}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name)}
        size="small"
        sx={{ mb: touched[name] && errors[name] ? 1 : 0 }}
        {...rest}
      />
      {touched[name] && errors[name] && (
        <ErrorMessage name={name} render={FormErrorMessage} />
      )}
    </FormControl>
  );
}
