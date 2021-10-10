import React, { useState } from "react";
import { useDispatch } from "react-redux";
import testingUser from "../../data/testingUser.json";
import { profileActions } from "../../store/reducers/profile";

export default function AuthHook() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const dispatch = useDispatch();

  const delay = (secTimer = 1) =>
    new Promise((res, rej) => setTimeout(() => res(true), secTimer * 1000));

  const loginUser = async (body) => {
    if (loginLoading) reutrn;
    const { email, password } = body;
    setLoginLoading(true);

    const user = testingUser.find((user) => user.email === email);

    await delay(1);

    if (!user) {
      setLoginLoading(false);
      await delay(0.2);
      alert("User Not Found with this email address");
      return false;
    }

    // If User Found
    const isPasswordMatch = user.passoword === password;
    if (!isPasswordMatch) {
      setLoginLoading(false);
      await delay(0.2);
      alert("Password is Wrong");
      return false;
    }

    delay(0.2);

    dispatch({
      type: profileActions.UPDATE_PROFILE,
      param: user,
    });

    setLoginLoading(false);

    return true;
  };

  const logoutUser = async () => {
    dispatch({
      type: profileActions.LOGOUT_PROFILE,
    });
  };

  return {
    loginLoading,
    logoutLoading,
    loginUser,
    logoutUser,
  };
}
