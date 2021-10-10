import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormField, FormSubmitButton } from "../form";
import AuthHook from "../../hooks/auth/AuthHook";

export default function LoginScreen() {
  const { loginLoading, loginUser } = AuthHook();

  const initialValues = {
    email: "",
    password: "",
  };

  const options = [
    { id: 1, value: "mm", label: "Myanmar" },
    { id: 2, value: "en", label: "English" },
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });

  const onSubmitLogin = (values) => {
    loginUser(values);
  };

  return (
    <div>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitLogin}
      >
        <FormField type="text" name="email" id="email" />
        <FormField type="password" name="password" id="password" />
        <FormSubmitButton disabled={loginLoading} />
      </Form>
      {loginLoading && <div>Loading...</div>}
    </div>
  );
}
