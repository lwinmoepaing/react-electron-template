import { useFormikContext } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

export default function FormSubmitButton(props) {
  const { title, ...rest } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      type="submit"
      onClick={handleSubmit}
      {...rest}
    >
      {title ? title : "Submit"}
    </LoadingButton>
  );
}
