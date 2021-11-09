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
