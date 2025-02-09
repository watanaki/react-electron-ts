import { app, BrowserWindow, ipcMain } from "electron";
import { getUIPath, ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollRes } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath()
    }
  });
  if (isDev()) mainWindow.loadURL("http://localhost:5123");
  else mainWindow.loadFile(getUIPath());

  pollRes(mainWindow);
});

ipcMainHandle('getStaticData', () => getStaticData());
