const { ipcRenderer, contextBridge } = require("electron");
const dotEnv = require("dotenv");
dotEnv.config();
const { NOTI_CODE } = require("../config/constants");

const notificationApi = {
  // Usage: when you want to show native notification
  // electron.notificationApi.sendNotification()
  sendNotification: (params, cb) => {
    ipcRenderer.send(NOTI_CODE.SEND, params);
    if (cb) cb();
  },
  // Usage: when native notification is clicked
  // electron.notificationApi.onNotiClicked()
  onNotiClicked: (cb) => {
    ipcRenderer.on(NOTI_CODE.NOTI_WHEN_CLICK, cb);
  },
  // Usage: when native notification is closed
  // electron.notificationApi.onNotiClosed()
  onNotiClosed: (cb) => {
    ipcRenderer.on(NOTI_CODE.NOTI_WHEN_CLOSED, cb);
  },
};

contextBridge.exposeInMainWorld("electron", {
  notificationApi,
  // Some Constants
  __dirname: __dirname,
  __imageDir: __dirname + "/public/assets/images",
  __APP_NAME: process.env.APP_NAME || "Default App Name",
});
