const https = require("https");
const fs = require("fs");
const { ipcMain, Notification, BrowserWindow, app } = require("electron");
const { autoUpdater } = require("electron-updater");
const { NOTI_CODE, VERSION_CODE } = require("../config/constants");
const path = require("path");
const { DATABASE_DIRECTORY } = require("../config");

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
    versionUpdate();
  });

  ipcMain.on(VERSION_CODE.REQUEST_DBUPDATE, (_, params) => {
    sendVersionUpdateMessage("Backup Database.");
    const databasePath = path.join(DATABASE_DIRECTORY, "database.db3");
    const backupDatabasePath = path.join(
      DATABASE_DIRECTORY,
      "backup_database.db3"
    );
    const destination = path.join(DATABASE_DIRECTORY, "database.db3");

    // First Backup Database
    fs.copyFileSync(databasePath, backupDatabasePath);

    // Delete Current Database
    fs.unlinkSync(databasePath);

    sendVersionUpdateMessage("Updating Database.");

    download(process.env.DB_URL, destination, (error) => {
      sendVersionUpdateMessage("");
      if (error) {
        window.webContents.send(
          VERSION_CODE.VERSION_UPDATE_ERROR,
          "Error in Database Updating. " + error.message
        );

        // If Error Backup Database , replace real-one
        fs.copyFileSync(backupDatabasePath, databasePath);
        return;
      }
      // If no error update version
      versionUpdate();
    });
  });

  function versionUpdate() {
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
  }

  function sendVersionUpdateMessage(data) {
    window.webContents.send(VERSION_CODE.VERSION_UPDATE_MESSAGE, data);
  }
};

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = https
    .get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function (err) {
      // Handle errors
      if (dest) {
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
      }
      if (cb) cb(err.message);
    });
}
