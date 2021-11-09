import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormField, FormSubmitButton } from "../form";
import AuthHook from "../../hooks/auth/AuthHook";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LinearProgress, Stack } from "@mui/material";

export default function LoginScreen() {
  const {
    loginLoading,
    loginUser,
    setIsLoginError,
    isLoginError,
    errorMessage,
  } = AuthHook();

  const initialValues = {
    unique_name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    unique_name: Yup.string().required().label("Name"),
    password: Yup.string().required().min(6).label("Password"),
  });

  const onSubmitLogin = (values) => {
    loginUser(values);
  };

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsLoginError(false);
  };

  return (
    <>
      <Grid
        sx={{ my: 4 }}
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
      >
        <Grid item xs={10} sm={8} md={4} lg={3}>
          <Card>
            <LinearProgress variant="determinate" value={100} />
            <CardContent sx={{ pb: 1 }}>
              <Typography
                sx={{ fontSize: 16, mb: 1, textAlign: "center" }}
                color="text.secondary"
                gutterBottom
              >
                Login Form
              </Typography>

              <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitLogin}
              >
                <FormField
                  type="text"
                  name="unique_name"
                  id="unique_name"
                  label="Name"
                />
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
          </Card>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isLoginError}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
