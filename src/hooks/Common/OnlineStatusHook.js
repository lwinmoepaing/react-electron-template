import React, { useEffect, useState } from "react";
import NotificationHook from "./NotificationHook";

function OnlineStatusHook({ showNoti = false }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { sendNotification } = NotificationHook();

  const setOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  const setOfflineStatus = () => {
    setOnlineStatus(navigator.onLine);
    if (showNoti) sendNotification({ body: "Offline!!" });
  };

  useEffect(() => {
    window.addEventListener("online", setOnlineStatus);
    window.addEventListener("offline", setOfflineStatus);

    return () => {
      window.removeEventListener("online", setOnlineStatus);
      window.removeEventListener("offline", setOfflineStatus);
    };
  }, []);

  return {
    isOnline,
  };
}

export default OnlineStatusHook;
