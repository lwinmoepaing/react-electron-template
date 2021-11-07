import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import axios from "axios";

export default function LoginScreen() {
  const { electron } = window;
  const [isLogin, setIsLogin] = useState(false);
  const [getVersionLoading, setGetVersionLoading] = useState(false);
  const user = useSelector(({ profile }) => profile.data);

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

  const getVersion = async () => {
    try {
      setGetVersionLoading(true);
      setTimeout(() => {
        console.log("getVersion", electron);
        setGetVersionLoading(false);
      }, 1500);
      // const res = await axios.get("http://localhost:5050/api");
    } catch (e) {
      setGetVersionLoading(false);
      console.log(e);
    }
  };

  return isLogin ? (
    <Redirect to={"/home"} />
  ) : (
    <div>
      <h2> Login Screen </h2>
      <LoginForm />
      <button onClick={sendRequest}>ON CLick Request</button>
      <button onClick={getVersion}>get Version</button>
    </div>
  );
}
