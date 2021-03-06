import React from "react";
import { Provider } from "react-redux";
// import { ThemeProvider } from "styled-components";
import Routes from "./routes/Routes";
import TitleHook from "./hooks/common/TitleHook";
import configureStore from "./store";
import "./localization/i18n";
import { appActions } from "./store/reducers/appReducer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/material-theme";
// Default Electron (preload.js)
// You Can use electron.notification.onNotiClicked

// Redux Store from '../store/index'
const store = configureStore();

// Get Current App Version
if (window.electron.versionApi.onGetVersion) {
  window.electron.versionApi.onGetVersion((_, version) => {
    store.dispatch({
      type: appActions.UPDATE_CURRENT_VERSION,
      param: version,
    });
  });
}

const App = () => {
  // Title Hook for calling Browser Title
  TitleHook();

  // You can use useHistory for React-Router Hook

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
