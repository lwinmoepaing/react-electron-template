import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import AuthHook from "../../hooks/auth/AuthHook";
// Components
import BackButton from "../common/BackButton";
import LanguageToggle from "./LanguageToggle";
import LanguageHook from "../../hooks/common/LanguageHook";
import OnlineStatusHook from "../../hooks/common/OnlineStatusHook";

const Navbar = () => {
  const { logoutUser } = AuthHook();
  const { setChangeLanguage } = LanguageHook();
  const { t } = useTranslation();
  const history = useHistory();

  const onLogout = async () => {
    await setChangeLanguage("en");
    await logoutUser();
    history.replace(LOGIN_SCREEN.path);
  };

  return (
    <div>
      <Link to={"/"}>
        {t("navbar.home")} - ({"/"})
      </Link>
      <Link to={"/about"}>
        {t("navbar.about")} ({"/about"})
      </Link>
      <button onClick={onLogout}>Logout</button>
      <LanguageToggle />
    </div>
  );
};

export default Navbar;
