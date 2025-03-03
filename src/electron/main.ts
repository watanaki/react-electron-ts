import { app, BrowserWindow, ipcMain, nativeTheme, Tray } from "electron";
import { getUIPath, ipcMainHandle, ipcMainOn, isDev } from "./utils.js";
import { getStaticData, pollRes } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
  });
  if (isDev()) mainWindow.loadURL("http://localhost:5123");
  else mainWindow.loadFile(getUIPath());

  nativeTheme.themeSource = 'dark';
  pollRes(mainWindow);
  ipcMainHandle('getStaticData', () => getStaticData());
  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);

  ipcMainOn('changeFrameAction', (frameAction) => {
    if (frameAction === 'close')
      mainWindow.close();
    else if (frameAction === 'maximize')
      mainWindow.maximize();
    else if (frameAction === 'minimize')
      mainWindow.minimize();
  })
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on('close', (e) => {
    if (willClose) return;

    e.preventDefault();
    mainWindow.hide();
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}
