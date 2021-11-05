import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import mm from "./mm";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mm: { translation: mm },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
