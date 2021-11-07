const { ipcMain, Notification, BrowserWindow, app } = require("electron");
const { autoUpdater } = require("electron-updater");
const { NOTI_CODE, VERSION_CODE, COMMON } = require("../config/constants");

/**
 * @param {BrowserWindow} window
 * @param {app} electronApp
 * Server
 */
module.exports = (window, electronApp) => {
  // When Order Noti Send From Frontend
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

  // When Updating Request From Frontend
  ipcMain.on(VERSION_CODE.REQUEST_UPDATE, (_, params) => {
    const sendVersionUpdateMessage = (data) => {
      window.webContents.send(VERSION_CODE.VERSION_UPDATE_MESSAGE, data);
    };

    autoUpdater.checkForUpdatesAndNotify();

    // autoUpdater.on("checking-for-update", () => {
    //   sendVersionUpdateMessage("Checking for update...");
    // });

    autoUpdater.on("update-available", (info) => {
      sendVersionUpdateMessage("Update available.");
    });

    autoUpdater.on("update-not-available", (info) => {
      sendVersionUpdateMessage("Update not available.");
      window.webContents.send(VERSION_CODE.FINISHED_UPDATE);
    });

    autoUpdater.on("error", (err) => {
      window.webContents.send(
        VERSION_CODE.VERSION_UPDATE_ERROR,
        "Error in updater. " + err
      );
      window.webContents.send(VERSION_CODE.FINISHED_UPDATE);
    });

    autoUpdater.on("download-progress", (progressObj) => {
      // let log_message = "Download speed: " + progressObj.bytesPerSecond
      // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
      // dispatch(log_message)

      window.webContents.send(
        VERSION_CODE.PROGRESS_CHANGES,
        progressObj.percent
      );
    });

    autoUpdater.on("update-downloaded", (info) => {
      sendVersionUpdateMessage("Update downloaded");
      window.webContents.send(VERSION_CODE.FINISHED_UPDATE);
      autoUpdater.quitAndInstall();
    });
  });
};
