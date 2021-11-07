import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import SearchLoading from "../components/loading/SearchLoading";
import LoginForm from "../components/auth/LoginForm";
import axios from "axios";
import CheckVersionHook from "../hooks/common/CheckVersionHook";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const {
    currentVersion,
    nextVersion,
    getVersionLoading,
    checkVersionRelease,
  } = CheckVersionHook();

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
    <div>
      <h2> Login Screen </h2>
      <LoginForm />
      <div>
        <p style={{ padding: "16px 0", margin: 0 }}>
          Current Version: {currentVersion}{" "}
          {(nextVersion !== 0 || getVersionLoading) && " --> "}
          {!!nextVersion && nextVersion + " (New Version) "}
          {getVersionLoading && (
            <SearchLoading className="LoadingContainer" style={{ top: 5 }} />
          )}
        </p>

        <button onClick={checkVersionRelease}>
          {nextVersion ? "Do you want to update" : "Check Version ?"}
        </button>
      </div>
    </div>
  );
}
