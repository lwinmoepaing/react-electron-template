import { Formik } from "formik";
import React from "react";

export default function Form({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return <>{children}</>;
      }}
    </Formik>
  );
}
