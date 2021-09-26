const NotificationHook = () => {
  const DEFAULT_ICON = `${electron.__imageDir}/fox_noti.png`;

  const sendNotification = (
    { action, title, body, subtitle, sound = true, icon },
    cb = () => {}
  ) => {
    const messageParams = {};
    if (title) messageParams.title = title;
    if (body) messageParams.body = body;
    if (subtitle) messageParams.subtitle = subtitle;
    if (sound) messageParams.sound = sound;

    messageParams.icon = electron.notificationApi.sendNotification(
      messageParams,
      cb
    );
  };

  return {
    sendNotification,
  };
};

export default NotificationHook;
