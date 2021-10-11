import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LanguageHook from "../../hooks/common/LanguageHook";
const LanguageToggle = () => {
  const { isMm, setChangeLanguage } = LanguageHook();

  const toggleLanguage = () => {
    setChangeLanguage(isMm ? "en" : "mm");
  };

  return <button onClick={toggleLanguage}> {isMm ? "en" : "mm"} </button>;
};

export default LanguageToggle;
