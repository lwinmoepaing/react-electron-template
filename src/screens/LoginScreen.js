import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import SearchLoading from "../components/loading/SearchLoading";
import LoginForm from "../components/auth/LoginForm";
import axios from "axios";
import CheckVersionHook from "../hooks/common/CheckVersionHook";

export default function LoginScreen() {
  const { electron } = window;
  const [isLogin, setIsLogin] = useState(false);
  const {
    currentVersion,
    nextVersion,
    getVersionLoading,
    isReleaseNewVersion,
    versionStatus,
    versionUpdatePercentage,
    versionUpdateLoading,
    isVersionUpdateError,
    versionUpdateErrorMessage,
    checkVersionRelease,
    updateVersionRelease,
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
          {(isReleaseNewVersion || getVersionLoading) && " --> "}
          {!!isReleaseNewVersion && nextVersion + " (New Version) "}
          {getVersionLoading && (
            <SearchLoading className="LoadingContainer" style={{ top: 5 }} />
          )}
          {versionUpdateLoading &&
            versionUpdatePercentage &&
            versionUpdatePercentage + "%"}
        </p>

        {nextVersion === currentVersion && !getVersionLoading && (
          <div>Already Updated Version</div>
        )}

        <button
          onClick={
            isReleaseNewVersion ? updateVersionRelease : checkVersionRelease
          }
        >
          {isReleaseNewVersion
            ? "Do you want to update now ?"
            : "Check Version to Update?"}
        </button>

        {versionUpdateLoading && (
          <div>
            <p> Status: {versionStatus}</p>
          </div>
        )}

        {isVersionUpdateError && (
          <div>
            <p> {versionUpdateErrorMessage} </p>
          </div>
        )}
      </div>
    </div>
  );
}
