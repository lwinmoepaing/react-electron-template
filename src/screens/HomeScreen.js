import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Container from "../components/template/Container";
import NotificationHook from "../hooks/common/NotificationHook";

const HomeScreen = () => {
  const notiMessage = "My custom Noti Message";
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [clickedMes] = useState("");
  const [closedMes] = useState("");

  // Use Custom Hooks

  const { sendNotification } = NotificationHook({});

  const onSendNoti = useCallback(() => {
    const cusMessage = count + 1 + " - " + notiMessage;
    sendNotification({ body: cusMessage }, () => {});
    setCount(count + 1);
  }, [count, setCount]);

  return (
    <Container>
      <button onClick={onSendNoti}>Test Notification</button>
      {clickedMes && <p>{clickedMes}</p>}
      {closedMes && <p>{closedMes}</p>}
    </Container>
  );
};

export default HomeScreen;
