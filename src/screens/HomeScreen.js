import React, { useState, useEffect, useCallback } from "react";
import CommonComponent from "../components/common/CommonComponent";
import SomeComponent from "../components/SomeComponent";
import TitleHook from "../hooks/common/TitleHook";

const HomeScreen = () => {
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

  return (
    <>
      <h2>
        {notiMessage} ({count})
      </h2>
      <button onClick={sendNotification}>Send Notification</button>
      <CommonComponent />
      <SomeComponent />
      {clickedMes && <p>{clickedMes}</p>}
      {closedMes && <p>{closedMes}</p>}
    </>
  );
};

export default HomeScreen;
