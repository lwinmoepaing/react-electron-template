const electron = require("electron");
const { ipcRenderer, contextBridge } = electron;
const path = require("path");
const os = require("os");

let __osAddress = [];
for (let k in os.networkInterfaces()) {
  for (let k2 in interfaces[k]) {
    let address = interfaces[k][k2];
    if (address.family === "IPv4" && !address.internal) {
      __osAddress.push(address.address);
    }
  }
}

const { NOTI_CODE } = require("../config/constants");
const __imageDir = path.join(__dirname, "../", "public", "assets", "images");

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
  __imageDir: __imageDir,
  __osAddress: __osAddress,
});
