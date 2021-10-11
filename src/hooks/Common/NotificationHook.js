import { useEffect, useState } from "react";

const grantNoti = () => {
  if (!!("Notification" in window)) {
    return true;
  } else if (Notification.permission === "granted") {
    return true;
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        return true;
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

const NotificationHook = ({ onClicked, onClosed } = {}) => {
  const DEFAULT_ICON = `${electron.__imageDir}/fox_noti.png`;

  const [permissionNoti] = useState(grantNoti());

  useEffect(() => {
    if (permissionNoti) {
      // When CLicked
      if (onClicked) {
        electron.notificationApi.onNotiClicked(onClicked);
      }
      // When Closed
      if (onClosed) {
        electron.notificationApi.onNotiClosed(onClosed);
      }
    }
    return;
  }, [permissionNoti]);

  const sendNotification = (
    { action, title = "App Noti", body, subtitle, sound = true, icon },
    cb = () => {}
  ) => {
    if (!permissionNoti) return;

    const messageParams = {};

    if (title) messageParams.title = title;
    if (body) messageParams.body = body;
    if (subtitle) messageParams.subtitle = subtitle;
    if (sound) messageParams.sound = sound;
    messageParams.icon = icon ? icon : DEFAULT_ICON;

    // console.log(messageParams);

    electron.notificationApi.sendNotification(messageParams, cb);
  };

  return {
    sendNotification,
  };
};

export default NotificationHook;
