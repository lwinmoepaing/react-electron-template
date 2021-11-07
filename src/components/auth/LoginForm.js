import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormField, FormSubmitButton } from "../form";
import AuthHook from "../../hooks/auth/AuthHook";
import SearchLoading from "../../components/loading/SearchLoading";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
    <Grid
      sx={{ my: 4 }}
      container
      justifyContent="center"
      alignItems="center"
      rowSpacing={1}
    >
      <Grid item xs={10} sm={8} md={4} lg={3}>
        <Card>
          <CardContent sx={{ pb: 1 }}>
            <Typography
              sx={{ fontSize: 16, mb: 1 }}
              color="text.secondary"
              gutterBottom
            >
              Login
            </Typography>

            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitLogin}
            >
              <FormField type="text" name="email" id="email" label="Email" />
              <FormField
                type="password"
                name="password"
                id="password"
                label="Password"
              />
              <FormSubmitButton
                disabled={loginLoading}
                loading={loginLoading}
              />
            </Form>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
