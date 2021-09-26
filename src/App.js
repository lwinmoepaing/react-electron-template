import React, { useState, useCallback, useEffect } from "react";
import TitleHook from "./hooks/Common/TitleHook";

// Default Electron (preload.js)
const { electron } = window;

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
    electron.onNotiClicked((_, params) => {
      setClickedMes("Count " + params.body + " was clicked!!");
    });
    // When Closed
    electron.onNotiClosed((_, params) => {
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
    electron.sendNotification(messageParams, () => {});
    // Hello
    setCount(count + 1);
  }, [count, setCount]);

  return (
    <>
      <h2>
        {notiMessage} ({count})
      </h2>
      <button onClick={sendNotification}>Send Notification</button>

      {clickedMes && <p>{clickedMes}</p>}
      {closedMes && <p>{closedMes}</p>}
    </>
  );
};

export default App;
