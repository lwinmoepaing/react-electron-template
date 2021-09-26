import React, { useState, useCallback, useEffect } from "react";
import Routes from "./routes/Routes";
import TitleHook from "./hooks/common/TitleHook";

// Default Electron (preload.js)
// You Can use electron.notification.onNotiClicked

const App = () => {
  // Title Hook for calling Browser Title
  TitleHook();

  return <Routes />;
};

export default App;
