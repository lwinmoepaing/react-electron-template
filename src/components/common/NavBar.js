import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// All Routes
import {
  HOME_SCREEN,
  ABOUT_SCREEN,
  LOGIN_SCREEN,
} from "../../routes/constants";
import AuthHook from "../../hooks/auth/AuthHook";
// Components
import BackButton from "../common/BackButton";

const Navbar = () => {
  const { logoutUser } = AuthHook();
  const history = useHistory();

  const onLogout = async (values) => {
    await logoutUser();
    history.replace(LOGIN_SCREEN.path);
  };

  return (
    <div>
      <Link to={HOME_SCREEN.path}> Dashboard - ({HOME_SCREEN.path})</Link>
      <Link to={ABOUT_SCREEN.path}> About ({ABOUT_SCREEN.path}) </Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
