import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { notificationReducer } from "./reducers/notification";
import { profileReducer } from "./reducers/profile";

export default function configureStore() {
  const middlewares = [reduxThunk];

  const store = createStore(
    combineReducers({
      profile: profileReducer,
      noti: notificationReducer,
    }),
    applyMiddleware(...middlewares)
  );

  return store;
}
