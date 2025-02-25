import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssertPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssertPath(), 'trayIcon@2x.png'));

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ]));
  tray.on('click', () => {
    mainWindow.show();
  });
}