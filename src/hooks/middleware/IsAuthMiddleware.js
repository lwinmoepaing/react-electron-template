import React, { useEffect } from "react";
import * as localForage from "localforage";
import localStoreKeys from "../../store/localforage/localStoreKeys";
import { useDispatch, useSelector } from "react-redux";
import { profileActions, profileReducer } from "../../store/reducers/profile";

const IsAuthMiddleware = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ profile }) => profile.data);

  useEffect(() => {
    if (!user) {
      checkOfflineUser();
    }

    return () => dispatch;
  }, [user]);

  const checkOfflineUser = async () => {
    try {
      const offlineUser = await localForage.getItem(localStoreKeys.auth);

      if (!offlineUser) return;

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
