const { ipcRenderer, contextBridge, remote, app } = require("electron");
const ipRegex = require("ip-regex");
const path = require("path");
const os = require("os");
require("dotenv");
const { NOTI_CODE } = require("../config/constants");

const __imageDir = path.join(__dirname, "../", "public", "assets", "images");

const osInterfaces = os.networkInterfaces();
let __osAddress;
if (osInterfaces.en0) {
  __osAddress = osInterfaces.en0.find((interObj) => {
    return ipRegex.v4({ exact: true }).test(interObj.address);
  });
  __osAddress = __osAddress ? __osAddress.address : null;
}

// This all method
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

  onNotiRemoveListener: (cb) => {
    ipcRenderer.removeListener(NOTI_CODE.NOTI_WHEN_CLICK, cb);
  },

  // electron.notificationApi.onNotiClosed()
  onNotiClosed: (cb) => {
    ipcRenderer.on(NOTI_CODE.NOTI_WHEN_CLOSED, cb);
  },

  onNotiClosedRemoveListener: (cb) => {
    ipcRenderer.removeListener(NOTI_CODE.NOTI_WHEN_CLOSED, cb);
  },
};

contextBridge.exposeInMainWorld("electron", {
  notificationApi,
  // Some Constants
  __dirname: __dirname,
  __imageDir: __imageDir,
  __osAddress: __osAddress,
  __appVersion: process.env.VERSION,
});
