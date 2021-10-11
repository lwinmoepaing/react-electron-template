import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

// All Routes
import {
  HOME_SCREEN,
  ABOUT_SCREEN,
  LOGIN_SCREEN,
} from "../../routes/constants";
import AuthHook from "../../hooks/auth/AuthHook";
// Components
import BackButton from "../common/BackButton";
import LanguageToggle from "./LanguageToggle";

const Navbar = () => {
  const { logoutUser } = AuthHook();
  const { t } = useTranslation();
  const history = useHistory();

  const onLogout = async (values) => {
    await logoutUser();
    history.replace(LOGIN_SCREEN.path);
  };

  return (
    <div>
      <Link to={HOME_SCREEN.path}>
        {t("navbar.home")} - ({HOME_SCREEN.path})
      </Link>
      <Link to={ABOUT_SCREEN.path}>
        {" "}
        {t("navbar.about")} ({ABOUT_SCREEN.path}){" "}
      </Link>
      <button onClick={onLogout}>Logout</button>
      <LanguageToggle />
    </div>
  );
};

export default Navbar;
