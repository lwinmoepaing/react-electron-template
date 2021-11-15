/* eslint-disable no-unused-vars */
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
      {(_formik) => {
        return <>{children}</>;
      }}
    </Formik>
  );
}
