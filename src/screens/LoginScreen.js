import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import axios from "axios";
import VersionChecker from "../components/common/VersionChecker";

export default function LoginScreen() {
  const { electron } = window;
  const [isLogin, setIsLogin] = useState(false);

  const user = useSelector(({ profile }) => profile.data);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, [user]);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return isLogin ? (
    <Redirect to={"/home"} />
  ) : (
    <div style={{ borderTop: "1px solid #dfdfdf" }}>
      <LoginForm />
      <VersionChecker />
    </div>
  );
}
