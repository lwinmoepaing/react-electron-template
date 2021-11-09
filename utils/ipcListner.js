const https = require("https");
const fs = require("fs");
const { ipcMain, Notification, BrowserWindow, app } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const Downloader = require("nodejs-file-downloader");
const electronDL = require("electron-dl");

const { NOTI_CODE, VERSION_CODE } = require("../config/constants");
const { DATABASE_DIRECTORY } = require("../config");

/**
 * @param {BrowserWindow} window
 * @param {app} electronApp
 * Server
 */
module.exports = (window, server, electronApp) => {
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

  ipcMain.on(VERSION_CODE.REQUEST_DBUPDATE, (_, dbUrl) => {
    sendVersionUpdateMessage("Backup Database.");
    const databasePath = path.join(DATABASE_DIRECTORY, "database.db3");
    const backupDatabasePath = path.join(
      DATABASE_DIRECTORY,
      "backup_database.db3"
    );

    // First Backup Database
    if (fs.existsSync(databasePath)) {
      fs.copyFileSync(databasePath, backupDatabasePath);
    }

    sendVersionUpdateMessage("Downloading Database.");

    // Calling Download
    download(dbUrl, DATABASE_DIRECTORY, (errorMessage) => {
      sendVersionUpdateMessage("Updated Database");
      if (errorMessage) {
        window.webContents.send(
          VERSION_CODE.VERSION_UPDATE_ERROR,
          errorMessage
        );

        if (fs.existsSync(databasePath)) {
          fs.unlinkSync(databasePath);
        }

        // If Error Backup Database , replace real-one
        fs.copyFileSync(backupDatabasePath, databasePath);
        return;
      }

      sendVersionUpdateMessage("Success Database Updaing.");

      setTimeout(() => {
        // If no error update version
        versionUpdate();
      }, 1000);
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

  async function download(url, directory, cb) {
    try {
      if (fs.existsSync(path.join(directory, "updated_database.db3"))) {
        fs.unlinkSync(path.join(directory, "updated_database.db3"));
      }

      console.log("url", url);
      // Fetching
      const file = fs.createWriteStream(
        path.join(directory, "updated_database.db3")
      );
      const request = https
        .get(url, function (response) {
          response.pipe(file);
          if (cb) cb();
        })
        .on("error", (err) => {
          if (cb) cb(err.message);
        });

      // Electron-dl
      // await electronDL.download(window, url, {
      //   directory: directory,
      //   filename: "updated_database.db3",
      // });

      // nodejs-file-downloader
      // const downloader = new Downloader({
      //   url, //If the file name already exists, a new file with the name 200MB1.zip is created.
      //   directory: directory, //This folder will be created, if it doesn't exist.
      //   fileName: "updated_database.db3",
      // });

      // await downloader.download(); //Downloader.download() returns a promise.
      // if (cb) cb();
    } catch (err) {
      // IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
      // Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
      // Handle errors
      window.webContents.send(
        VERSION_CODE.VERSION_UPDATE_ERROR,
        "Error in Database Updating. " + err.message
      );
      console.log("Download failed", err);
      if (cb) cb(err.message);
    }
  }
};
