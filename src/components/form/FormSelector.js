import { ErrorMessage, useFormikContext } from "formik";
import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormErrorMessage from "./FormErrorMessage";

export default function FormSelector(props) {
  const { name, options, valueExtractor, labelExtractor, ...rest } = props;

  const { values, setFieldValue, touched, errors } = useFormikContext();

  const valueExtract = useCallback(
    (item) => (valueExtractor ? valueExtractor(item) : item?.value || ""),
    [options, valueExtractor]
  );

  const labelExtract = useCallback(
    (item) => (labelExtractor ? labelExtractor(item) : item?.key || ""),
    [options, labelExtractor]
  );

  const onHandleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <TextField
        name={name}
        id={name}
        select
        size="small"
        {...rest}
        onChange={onHandleChange}
        value={values[name]}
      >
        {options.map((item) => (
          <MenuItem key={labelExtract(item)} value={valueExtract(item)}>
            {labelExtract(item)}
          </MenuItem>
        ))}
      </TextField>
      {touched[name] && errors[name] && (
        <ErrorMessage name={name} render={FormErrorMessage} />
      )}
    </FormControl>
  );
}
