const { ipcRenderer, contextBridge } = require("electron");
const dotEnv = require("dotenv");
dotEnv.config();
const { NOTI_CODE } = require("../config/constants");

const notificationApi = {
  // electron.notificationApi.sendNotification()
  sendNotification: (params, cb) => {
    ipcRenderer.send(NOTI_CODE.SEND, params);
    if (cb) cb();
  },
  // electron.notificationApi.onNotiClicked()
  onNotiClicked: (cb) => {
    ipcRenderer.on(NOTI_CODE.NOTI_WHEN_CLICK, cb);
  },
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
