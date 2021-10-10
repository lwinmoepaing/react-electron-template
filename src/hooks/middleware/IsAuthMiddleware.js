import React, { useEffect } from "react";
import * as localForage from "localforage";
import localStoreKeys from "../../store/localforage/localStoreKeys";
import { useDispatch } from "react-redux";
import { profileActions, profileReducer } from "../../store/reducers/profile";

const IsAuthMiddleware = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkOfflineUser();
    return () => dispatch;
  }, []);

  const checkOfflineUser = async () => {
    try {
      const offlineUser = await localForage.getItem(localStoreKeys.auth);
      dispatch({
        type: profileActions.UPDATE_PROFILE,
        param: JSON.parse(offlineUser),
      });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export default IsAuthMiddleware;
