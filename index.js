const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  Tray,
  screen,
} = require("electron");
const path = require("path");
const { VERSION_CODE } = require("./config/constants");
const server = require("./server");
// Constants
const ipcListener = require("./utils/ipcListner");
// Call For Env

// Some Constants
const isDev = !app.isPackaged;
const isMac = process.platform === "darwin";
const defaultWindowBackground = "white";
const preloadDir = path.join(__dirname, "utils", "preload.js");
const imageDir = path.join(__dirname, "public", "assets", "images");
const dockIcon = path.join(imageDir, "app_logo.png");
const trayIcon = path.join(imageDir, "react_icon.png");

if (isDev) {
  const electronReload = require("electron-reload");
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
    // Call Backend Api default Port 5050
    mainApp.once("ready-to-show", () => {
      setTimeout(() => {
        splash.destroy();
        mainApp.show();
      }, 10000);
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
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const menuTemplate = require("./utils/Menu").createTemplate(app);
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  tray = new Tray(trayIcon);
  tray.setContextMenu(mainMenu);

  const window = new BrowserWindow({
    width,
    height,
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

  // window.webContents.openDevTools();
  isDev && window.webContents.openDevTools();
  // Call Backend
  const backend = server();

  ipcListener(window, backend, app);

  window.webContents.on("did-finish-load", () => {
    window.webContents.send(VERSION_CODE.SEND_VERSION, app.getVersion());
  });

  return window;
}

function createSplashScreen() {
  const window = new BrowserWindow({
    width: 500,
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
