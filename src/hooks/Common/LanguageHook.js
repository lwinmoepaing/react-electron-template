import { useCallback } from "react";
import * as localforage from "localforage";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import localStoreKeys from "../../store/localforage/localStoreKeys";
import { languageActions } from "../../store/reducers/language";

export default function LanguageHook() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const langList = ["en", "mm"];
  const currentLang = useSelector(({ lang }) => lang);

  /**
   * @param {'mm' | 'en'} lang
   */
  const setChangeLanguage = useCallback(
    async (lang) => {
      await localforage.setItem(localStoreKeys.lang, lang);
      i18n.changeLanguage(lang);
      dispatch({
        type: languageActions.UPDATE_LANGUAGE,
        param: lang,
      });
    },
    [i18n, dispatch, localforage, languageActions]
  );

  return {
    langList,
    setChangeLanguage,
    currentLang,
    isMm: currentLang === "mm",
  };
}
