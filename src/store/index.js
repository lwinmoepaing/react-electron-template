import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { notificationReducer } from "./reducers/notification";
import { profileReducer } from "./reducers/profile";
import { languageReducer } from "./reducers/language";

export default function configureStore() {
  const middlewares = [reduxThunk];

  const store = createStore(
    combineReducers({
      profile: profileReducer,
      noti: notificationReducer,
      lang: languageReducer,
    }),
    applyMiddleware(...middlewares)
  );

  return store;
}
