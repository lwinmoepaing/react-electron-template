import React, { useState, useEffect, useCallback } from "react";
import Container from "../components/common/Container";
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
    <Container withNavbar>
      <h2>
        {notiMessage} ({count})
      </h2>
      <button onClick={onSendNoti}>Test Notification</button>
      {clickedMes && <p>{clickedMes}</p>}
      {closedMes && <p>{closedMes}</p>}
    </Container>
  );
};

export default HomeScreen;
