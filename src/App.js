import React, { useState, useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import TitleHook from "./hooks/common/TitleHook";
import configureStore from "./store";
import "./localization/i18n";
// Default Electron (preload.js)
// You Can use electron.notification.onNotiClicked

// // Redux Store from '../store/index'
const store = configureStore();

const App = () => {
  // Title Hook for calling Browser Title
  TitleHook();

  // You can use useHistory for React-Router Hook

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;

