module.exports.NOTI_CODE = {
  // Emit to Server
  // GET FROM SERVER
  SEND: "noti:notify",

  // Emit to Frontend
  NOTI_WHEN_CLICK: "noti:clicked",
  NOTI_WHEN_CLOSED: "noti:closed",
};

module.exports.VERSION_CODE = {
  // Emit to Server
  // Request to Server for updating version
  REQUEST_UPDATE: "version:request_update",

  // Emit to Frontend
  // When Percentage Progress Changes
  VERSION_UPDATE_MESSAGE: "version:update_message",
  VERSION_UPDATE_ERROR: "version:update_error",
  PROGRESS_CHANGES: "version:progress",
  FINISHED_UPDATE: "version:finished_update",
};

module.exports.COMMON = {
  // Emit to Frontend
  // Send Message From Server
  SEND_MESSAGE_FROM_SERVER: "message:from_server",
};
