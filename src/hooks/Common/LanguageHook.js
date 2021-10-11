import React from "react";
import { useDispatch } from "react-redux";
import { languageActions } from "../../store/reducers/language";

export default function LanguageHook() {
  const dispatch = useDispatch();
  const langList = ["en", "mm"];
  /**
   * @param {'mm' | 'en'} lang
   */
  const setChangeLanguage = (lang) => {
    dispatch({
      type: languageActions.UPDATE_LANGUAGE,
      param: lang,
    });
  };

  return {
    langList,
    setChangeLanguage,
  };
}
