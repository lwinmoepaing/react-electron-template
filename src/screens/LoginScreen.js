import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import VersionChecker from "../components/common/VersionChecker";

const DEFAULT_REDIRECT = "/home"; // Redirect when logout

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(false);

  const user = useSelector(({ profile }) => profile.data);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, [user]);

  return isLogin ? (
    <Redirect to={DEFAULT_REDIRECT} />
  ) : (
    <div style={{ borderTop: "1px solid #dfdfdf" }}>
      <LoginForm />
      <VersionChecker />
    </div>
  );
}
