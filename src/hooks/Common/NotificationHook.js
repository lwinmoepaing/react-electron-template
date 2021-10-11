import { useEffect } from "react";

const NotificationHook = ({ onClicked, onClosed }) => {
  const DEFAULT_ICON = `${electron.__imageDir}/fox_noti.png`;

  const sendNotification = (
    { action, title = "App Noti", body, subtitle, sound = true, icon },
    cb = () => {}
  ) => {
    const messageParams = {};

    if (title) messageParams.title = title;
    if (body) messageParams.body = body;
    if (subtitle) messageParams.subtitle = subtitle;
    if (sound) messageParams.sound = sound;
    messageParams.icon = icon ? icon : DEFAULT_ICON;

    // console.log(messageParams);

    electron.notificationApi.sendNotification(messageParams, cb);
  };

  useEffect(() => {
    // When CLicked
    if (onClicked) {
      electron.notificationApi.onNotiClicked(onClicked);
    }
    // When Closed
    if (onClosed) {
      electron.notificationApi.onNotiClosed(onClosed);
    }

    return;
  }, []);

  return {
    sendNotification,
  };
};

export default NotificationHook;
