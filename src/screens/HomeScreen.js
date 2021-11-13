import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Container from "../components/template/Container";
import TestTable from "../components/common/TestTable";
import NotificationHook from "../hooks/common/NotificationHook";

const HomeScreen = () => {
  const notiMessage = "My custom Noti Message";
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  // Use Custom Hooks

  const { sendNotification } = NotificationHook({});

  const onSendNoti = useCallback(() => {
    const cusMessage = count + 1 + " - " + notiMessage;
    sendNotification({ title: "LWIN", body: cusMessage }, () => {});
    setCount(count + 1);
  }, [count, setCount]);

  return (
    <Container>
      <TestTable />
    </Container>
  );
};

export default HomeScreen;
