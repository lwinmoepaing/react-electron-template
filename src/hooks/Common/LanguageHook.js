import * as localforage from "localforage";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import localStoreKeys from "../../store/localforage/localStoreKeys";
import { languageActions } from "../../store/reducers/language";

export default function LanguageHook() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const langList = ["en", "mm"];
  const currentLang = useSelector(({ lang }) => lang);

  /**
   * @param {'mm' | 'en'} lang
   */
  const setChangeLanguage = async (lang) => {
    await localforage.setItem(localStoreKeys.lang, lang);
    i18n.changeLanguage(lang);
    dispatch({
      type: languageActions.UPDATE_LANGUAGE,
      param: lang,
    });
  };

  return {
    langList,
    setChangeLanguage,
    currentLang,
    isMm: currentLang === "mm",
  };
}
