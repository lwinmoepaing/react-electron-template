const { ipcRenderer, contextBridge, remote, app } = require("electron");
const ipRegex = require("ip-regex");
const path = require("path");
const os = require("os");
require("dotenv");
const { NOTI_CODE, VERSION_CODE, COMMON } = require("../config/constants");

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

// Version Update Api
// When Version Update Progress Download !!
const versionApi = {
  requestUpdate: () => {
    ipcRenderer.send(VERSION_CODE.REQUEST_UPDATE);
  },

  requestDbUpdate: (dbUrl) => {
    ipcRenderer.send(VERSION_CODE.REQUEST_DBUPDATE, dbUrl);
  },

  onGetVersion: (cb) => {
    ipcRenderer.on(VERSION_CODE.SEND_VERSION, cb);
  },

  onVersionMessage: (cb) => {
    ipcRenderer.on(VERSION_CODE.VERSION_UPDATE_MESSAGE, cb);
  },

  onVersionMessageRemoveListener: (cb) => {
    ipcRenderer.removeListener(VERSION_CODE.VERSION_UPDATE_MESSAGE, cb);
  },

  onVersionUpdateError: (cb) => {
    ipcRenderer.on(VERSION_CODE.VERSION_UPDATE_ERROR, cb);
  },

  onVersionUpdateErrorRemoveListener: (cb) => {
    ipcRenderer.removeListener(VERSION_CODE.VERSION_UPDATE_ERROR, cb);
  },

  onVersionUpdatePercentage: (cb) => {
    ipcRenderer.on(VERSION_CODE.PROGRESS_CHANGES, cb);
  },

  onVersionUpdatePercentageRemoveListener: (cb) => {
    ipcRenderer.removeListener(VERSION_CODE.PROGRESS_CHANGES, cb);
  },

  onFinishedUpdate: (cb) => {
    ipcRenderer.on(VERSION_CODE.FINISHED_UPDATE, cb);
  },

  onFinishedUpdateRemoveListener: (cb) => {
    ipcRenderer.removeListener(VERSION_CODE.FINISHED_UPDATE, cb);
  },
};

//
const commonApi = {
  onMessage: (cb) => {
    ipcRenderer.on(COMMON.SEND_MESSAGE_FROM_SERVER, cb);
  },

  onMessageRemoveListener: (cb) => {
    ipcRenderer.removeListener(COMMON.SEND_MESSAGE_FROM_SERVER, cb);
  },
};

contextBridge.exposeInMainWorld("electron", {
  notificationApi,
  versionApi,
  commonApi,
  // Some Constants
  __dirname: __dirname,
  __imageDir: __imageDir,
  __osAddress: __osAddress,
});
