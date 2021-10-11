import React, { useEffect, useState } from "react";
import * as localForage from "localforage";
import localStoreKeys from "../../store/localforage/localStoreKeys";
import { useDispatch, useSelector } from "react-redux";
import { profileActions, profileReducer } from "../../store/reducers/profile";
import { languageActions } from "../../store/reducers/language";
import { useTranslation } from "react-i18next";

const IsAuthMiddleware = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isCheckingLanguage, setIsCheckingLanguage] = useState(false);

  const user = useSelector(({ profile }) => profile.data);

  useEffect(() => {
    if (!user) {
      checkOfflineUser();
    }

    isInitLanguage();

    return () => dispatch;
  }, [user]);

  const checkOfflineUser = async () => {
    try {
      setIsCheckingUser(true);
      const offlineUser = await localForage.getItem(localStoreKeys.auth);
      setIsCheckingUser(false);
      if (!offlineUser) return;

      dispatch({
        type: profileActions.UPDATE_PROFILE,
        param: JSON.parse(offlineUser),
      });
    } catch (e) {
      console.log(e.message);
      setIsCheckingUser(false);
    }
  };

  const isInitLanguage = async () => {
    try {
      setIsCheckingLanguage(true);
      const offlineLang = await localForage.getItem(localStoreKeys.lang);
      setIsCheckingLanguage(false);
      if (!offlineLang) return;
      i18n.changeLanguage(offlineLang);
      dispatch({
        type: languageActions.UPDATE_LANGUAGE,
        param: offlineLang,
      });
    } catch (e) {
      console.log(e.message);
      setIsCheckingLanguage(false);
    }
  };

  return {
    isCheckingUser,
    isCheckingLanguage,
  };
};

export default IsAuthMiddleware;
