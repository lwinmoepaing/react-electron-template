const { ipcMain, Notification, BrowserWindow } = require("electron");
const { NOTI_CODE } = require("../config/constants");

/**
 * @param {BrowserWindow} window
 */
module.exports = (window) => {
  ipcMain.on(NOTI_CODE.SEND, (_, params) => {
    const { title, body, icon } = params;

    let notification = new Notification(
      icon ? { icon, ...params } : { title, body }
    );

    notification.show();

    notification.on("click", (event, arg) => {
      window.webContents.send(NOTI_CODE.NOTI_WHEN_CLICK, params);
    });

    notification.on("close", () => {
      window.webContents.send(NOTI_CODE.NOTI_WHEN_CLOSED, params);
    });

    notification.on("action", () => {
      // console.log("action");
    });

    notification.on("show", () => {
      // console.log("on Show");
      notification = null;
    });
  });
};
