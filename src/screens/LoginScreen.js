import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  Form,
  FormField,
  FormSelector,
  FormSubmitButton,
} from "../components/form";

export default function LoginScreen() {
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
    categories: Yup.string().required(),
  });

  return (
    <div>
      <h2> Login Screen </h2>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => alert(JSON.stringify(values))}
      >
        <FormField type="text" name="email" id="email" />
        <FormField type="password" name="password" id="password" />
        <FormSelector
          options={options}
          label="Categories"
          name="categories"
          labelExtractor={(item) => item.label}
          valueExtractor={(item) => item.value}
        />
        <FormSubmitButton />
      </Form>
    </div>
  );
}
