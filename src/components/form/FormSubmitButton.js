import { useFormikContext } from "formik";
import React from "react";

export default function FormSubmitButton(props) {
  const { title, ...rest } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <button type="submit" onClick={handleSubmit} {...rest}>
      {title ? title : "Submit"}
    </button>
  );
}
