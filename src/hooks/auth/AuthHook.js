import React, { useState } from "react";
import { useDispatch } from "react-redux";
import testingUser from "../../data/testingUser.json";
import { profileActions } from "../../store/reducers/profile";
import { requestLogin } from "../../api/auth";
import * as localForage from "localforage";
import localStoreKeys from "../../store/localforage/localStoreKeys";
import { arrayConcatToString, cleanAllLocalData } from "../../utils/helper";

export default function AuthHook() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const delay = (secTimer = 1) =>
    new Promise((res, rej) => setTimeout(() => res(true), secTimer * 1000));

  const loginUser = async (body) => {
    if (loginLoading) return;
    setLoginLoading(true);
    setIsLoginError(false);

    try {
      const response = await requestLogin(body);
      const user = response.data.data;
      const token = response.data.token;
      await localForage.setItem(localStoreKeys.auth, JSON.stringify(user));
      await localForage.setItem(localStoreKeys.token, JSON.stringify(token));
      dispatch({
        type: profileActions.UPDATE_PROFILE,
        param: user,
      });
      dispatch({
        type: profileActions.UPDATE_TOKEN,
        param: token,
      });

      setLoginLoading(false);
    } catch (err) {
      setIsLoginError(true);
      setLoginLoading(false);
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        if (err.response.data.message) {
          setErrorMessage(arrayConcatToString(err.response.data.message));
        } else if (err.response.data.data.length) {
          setErrorMessage(
            arrayConcatToString(
              err.response.data.data.map((item) => item.message)
            )
          );
        }
      } else if (err.request) {
        // The request was made but no response was received
        setErrorMessage("Connection Timeout (plz restart app)");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(
          "Something went wrong " + err.message + " (plz restart app)"
        );
      }
    }
  };

  const logoutUser = async () => {
    await cleanAllLocalData();

    dispatch({
      type: profileActions.LOGOUT_PROFILE,
    });
  };

  return {
    loginLoading,
    logoutLoading,
    isLoginError,
    errorMessage,
    loginUser,
    logoutUser,
    setIsLoginError,
  };
}
