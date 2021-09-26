const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const electronReload = require("electron-reload");
// Constants
const ipcListener = require("./utils/ipcListner");
// Call For Env

// Some Constants
const isDev = !app.isPackaged;
const isMac = process.platform === "darwin";
const defaultWindowBackground = "white";
const preloadDir = path.join(__dirname, "utils", "preload.js");

// path.join(__dirname, "preload.js");

if (isDev) {
  electronReload(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app
  .whenReady()
  .then(createBrowser)
  .then(() => new Notification({ silent: true })); // Fixed First Time Noti Off

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});

app.on("activate", () => {
  const isAnyBrowser = BrowserWindow.getAllWindows().length > 0;
  if (!isAnyBrowser) createBrowser();
});

function createBrowser() {
  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    backgroundColor: defaultWindowBackground,
    title: process.env.APP_NAME || "sample title",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadDir,
    },
  });

  window.loadFile(`public/index.html`);
  isDev && window.webContents.openDevTools();

  ipcListener(window);
}
