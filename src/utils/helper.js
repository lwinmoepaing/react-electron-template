import * as localForage from "localforage";
import localStoreKeys from "../store/localforage/localStoreKeys";

export const cleanAllLocalData = () => {
  const allLocalKeys = Object.keys(localStoreKeys).map(
    (key) => localStoreKeys[key]
  );

  return Promise.all(allLocalKeys.map((item) => localForage.removeItem(item)));
};

export const arrayConcatToString = (data) => {
  return typeof data === "string" ? data : data.map((item) => item).join`,`;
};

export const delay = (secTimer = 0.7) =>
  new Promise((res, rej) => setTimeout(() => res(true), secTimer * 1000));

export const manageAuthorize = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
