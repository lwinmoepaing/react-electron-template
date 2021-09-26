import React, { useState, useEffect, useCallback } from "react";
import CommonComponent from "../components/common/CommonComponent";
import SomeComponent from "../components/SomeComponent";
import NotificationHook from "../hooks/common/NotificationHook";

const HomeScreen = () => {
  const notiMessage = "My custom Noti Message";

  const [count, setCount] = useState(0);
  const [clickedMes, setClickedMes] = useState("");
  const [closedMes, setClosedMes] = useState("");

  // Use Custom Hooks

  const { sendNotification } = NotificationHook({});

  const onSendNoti = useCallback(() => {
    const cusMessage = count + 1 + " - " + notiMessage;
    sendNotification({ body: cusMessage }, () => {});
    setCount(count + 1);
  }, [count, setCount]);

  return (
    <div>
      <h2>
        {notiMessage} ({count})
      </h2>
      <button onClick={onSendNoti}>Send Notification</button>
      <CommonComponent />
      <SomeComponent />
      {clickedMes && <p>{clickedMes}</p>}
      {closedMes && <p>{closedMes}</p>}
    </div>
  );
};

export default HomeScreen;
