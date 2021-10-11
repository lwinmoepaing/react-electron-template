const { app } = require("electron");

/**
 * @param {app} app
 */
module.exports.createTemplate = (app) => {
  const isMac = process.platform === "darwin";
  const { shell, BrowserWindow, dialog } = require("electron");

  const AppMenu = {
    label: isMac ? app.getName() : "Menu",
    submenu: [
      {
        label: "Exit",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.quit();
        },
      },
    ],
  };

  const EditMenu = {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        role: "undo",
      },
    ],
  };

  const ViewMenu = {
    label: "View",
    submenu: [
      // {
      //   label: "Reload",
      //   accelerator: "CmdOrCtrl+R",
      //   click: (_, focusedWindow) => {
      //     if (focusedWindow) {
      //       // on reload, start fresh and close any old
      //       // open secondary windows
      //       if (focusedWindow.id === 1) {
      //         // console.log('in FOCUS!');
      //         BrowserWindow.getAllWindows().forEach((win) => {
      //           if (win.id > 1) {
      //             // console.log('Closing!');
      //             win.close();
      //           }
      //         });
      //       }
      //       focusedWindow.reload();
      //     }
      //   },
      // },
      {
        label: "Toggle Full Screen",
        accelerator: (() => {
          if (isMac) {
            return "Ctrl+Command+F";
          } else {
            return "F11";
          }
        })(),
        click: (_, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      // {
      //   label: "Toggle Developer Tools",
      //   accelerator: (() => {
      //     if (isMac) {
      //       return "Alt+Command+I";
      //     } else {
      //       return "Ctrl+Shift+I";
      //     }
      //   })(),
      //   click: (_, focusedWindow) => {
      //     if (focusedWindow) {
      //       focusedWindow.toggleDevTools();
      //     }
      //   },
      // },
      //   {
      //     type: "separator",
      //   },
      //   {
      //     label: "App Menu Demo",
      //     click: function (_, focusedWindow) {
      //       if (focusedWindow) {
      //         const options = {
      //           type: "info",
      //           title: "Application Menu Demo",
      //           buttons: ["Ok"],
      //           message:
      //             "This demo is for the Menu section, showing how to create a clickable menu item in the application menu.",
      //         };
      //         dialog.showMessageBox(focusedWindow, options);
      //       }
      //     },
      //   },
    ],
  };

  const WindowMenu = {
    label: "Window",
    role: "window",
    submenu: [
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close",
      },
      {
        type: "separator",
      },
      {
        label: "Reopen Window",
        accelerator: "CmdOrCtrl+Shift+T",
        enabled: false,
        click: () => {
          app.emit("activate");
        },
      },
    ],
  };

  const HelpMenu = {
    label: "Help",
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: () => {
          // The shell module provides functions related to desktop integration.
          // An example of opening a URL in the user's default browser:
          shell.openExternal("http://lwinmoepaing.github.io");
        },
      },
    ],
  };

  return [AppMenu, EditMenu, ViewMenu, WindowMenu, HelpMenu];
};
