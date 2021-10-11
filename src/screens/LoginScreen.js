import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import { HOME_SCREEN } from "../routes/constants";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector(({ profile }) => profile.data);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, [user]);

  return isLogin ? (
    <Redirect to={HOME_SCREEN.path} />
  ) : (
    <div>
      <h2> Login Screen </h2>
      <LoginForm />
    </div>
  );
}
