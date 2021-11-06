import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { electron } from "webpack";
import LoginForm from "../components/auth/LoginForm";
import { HOME_SCREEN } from "../routes/constants";
import axios from "axios";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector(({ profile }) => profile.data);
  d;
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
    console.log("{electron.__osAddress}");
    console.log(electron.__osAddress);

    console.log("{electron.__appVersion}");
    console.log(electron.__appVersion);
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
    <Redirect to={HOME_SCREEN.path} />
  ) : (
    <div>
      <h2> Login Screen </h2>
      <LoginForm />
      <button onClick={sendRequest}>ON CLick Request</button>
    </div>
  );
}
