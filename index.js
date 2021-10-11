const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  Tray,
} = require("electron");
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
const imageDir = path.join(__dirname, "public", "assets", "images");
const dockIcon = path.join(imageDir, "fox_noti.png");
const trayIcon = path.join(imageDir, "react_icon.png");

// path.join(__dirname, "preload.js");

if (isDev) {
  electronReload(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

if (isMac) {
  app.dock.setIcon(dockIcon);
}

app
  .whenReady()
  .then(() => {
    const splash = createSplashScreen();
    const mainApp = createBrowser();
    mainApp.once("ready-to-show", () => {
      setTimeout(() => {
        splash.destroy();
        mainApp.show();
      }, 2000);
    });
  })
  .then(() => new Notification({ silent: true })); // Fixed First Time Noti Off

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});

app.on("activate", () => {
  const isAnyBrowser = BrowserWindow.getAllWindows().length > 0;
  if (!isAnyBrowser) createBrowser();
});

let tray = null;
function createBrowser() {
  const menuTemplate = require("./utils/Menu").createTemplate(app);
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  tray = new Tray(trayIcon);
  tray.setContextMenu(mainMenu);

  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    backgroundColor: defaultWindowBackground,
    title: process.env.APP_NAME || "sample title",
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadDir,
    },
  });

  window.loadFile(`public/index.html`);
  isDev && window.webContents.openDevTools();

  ipcListener(window);

  return window;
}

function createSplashScreen() {
  const window = new BrowserWindow({
    width: 450,
    height: 280,
    frame: false,
    transparent: true,
    title: process.env.APP_NAME || "sample title",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  window.loadFile(`public/splash-loading.html`);
  return window;
}
