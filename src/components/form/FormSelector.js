import { ErrorMessage, Field } from "formik";
import React from "react";
import FormErrorMessage from "./FormErrorMessage";

export default function FormSelector(props) {
  const { label, name, options, valueExtractor, labelExtractor, ...rest } =
    props;

  const valueExtract = (item) =>
    valueExtractor ? valueExtractor(item) : item.value;

  const labelExtract = (item) =>
    labelExtractor ? labelExtractor(item) : item.key;

  return (
    <div className="form-control">
      <label htmlFor={name}> {label} </label>
      <Field name={name} id={name} as="select" {...rest}>
        {options.map((item) => (
          <option key={valueExtract(item)} value={valueExtract(item)}>
            {labelExtract(item)}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={FormErrorMessage} />
    </div>
  );
}
