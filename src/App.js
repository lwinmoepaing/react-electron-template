import React, { useState, useCallback, useEffect } from "react";

import HomeScreen from "./screens/HomeScreen";
// Hooks
import TitleHook from "./hooks/Common/TitleHook";

// Default Electron (preload.js)
// You Can use electron.notification.onNotiClicked

const App = () => {
  // const title = "World - DEV";
  const notiMessage = "My custom Noti Message";

  const [count, setCount] = useState(0);
  const [clickedMes, setClickedMes] = useState("");
  const [closedMes, setClosedMes] = useState("");

  // Use Custom Hooks
  TitleHook();

  useEffect(() => {
    // When CLicked
    electron.notificationApi.onNotiClicked((_, params) => {
      setClickedMes("Count " + params.body + " was clicked!!");
    });
    // When Closed
    electron.notificationApi.onNotiClosed((_, params) => {
      setClosedMes("Count " + params.body + " was closed!!");
    });
  }, []);

  const sendNotification = useCallback(() => {
    const cusMessage = count + 1 + " - " + notiMessage;
    const messageParams = {
      title: "React App Noti",
      body: cusMessage,
      icon: `${electron.__imageDir}/fox_noti.png`,
    };
    electron.notificationApi.sendNotification(messageParams, () => {});
    // Hello
    setCount(count + 1);
  }, [count, setCount]);

  return <HomeScreen />;
};

export default App;
