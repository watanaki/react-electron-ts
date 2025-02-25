import { app, BrowserWindow, Menu } from "electron";
import { ipcWebContentsSend, isDev } from "./utils.js";

export function createMenu(mainWindow: BrowserWindow) {
  app.applicationMenu = Menu.buildFromTemplate([
    {
      label: 'View',
      type: 'submenu',
      submenu: [
        {
          label: 'CPU Usage',
          click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'CPU'),
        },
        {
          label: 'RAM Usage',
          click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'RAM'),
        },
        {
          label: 'STORAGE',
          click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'STORAGE'),
        }
      ]
    },
    {
      label: 'Quit',
      click: () => app.quit()
    },
    {
      label: 'Dev',
      visible: isDev(),
      type: 'submenu',
      submenu: [
        {
          label: 'OpenDevTools',
          accelerator: isDev() ? 'CmdOrCtrl+Shift+I' : undefined,
          click: () => {
            if (mainWindow.webContents.isDevToolsOpened())
              mainWindow.webContents.closeDevTools();
            else
              mainWindow.webContents.openDevTools();
          },
        }
      ]
    }
  ])
}