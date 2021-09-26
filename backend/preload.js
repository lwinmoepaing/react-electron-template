const { ipcRenderer, contextBridge } = require("electron");
const dotEnv = require("dotenv");
dotEnv.config();

const { NOTI_CODE } = require("../config/constants");

contextBridge.exposeInMainWorld("electron", {
  // window.electron.sendNotification()
  sendNotification: (params, cb) => {
    ipcRenderer.send(NOTI_CODE.SEND, params);
    if (cb) cb();
  },
  // window.electron.onNotiClicked()
  onNotiClicked: (cb) => {
    ipcRenderer.on(NOTI_CODE.NOTI_WHEN_CLICK, cb);
  },
  // window.electron.onNotiClosed()
  onNotiClosed: (cb) => {
    ipcRenderer.on(NOTI_CODE.NOTI_WHEN_CLOSED, cb);
  },
  // Some Constants
  __dirname: __dirname,
  __imageDir: __dirname + "/public/assets/images",
  __APP_NAME: process.env.APP_NAME || "Default App Name",
});
