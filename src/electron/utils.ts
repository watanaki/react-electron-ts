import { app, ipcMain, WebContents, WebFrameMain } from "electron";
import path from "path";
import { pathToFileURL } from "url";

export function isDev(): boolean {
  return process.env.NODE_ENV === "dev";
}

export function ipcMainHandle<K extends keyof EventPayloadMapping,>(
  key: K,
  cb: () => EventPayloadMapping[K]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame!);
    return cb();
  });
}

export function ipcWebContentsSend<K extends keyof EventPayloadMapping>(
  key: K, webContents: WebContents, payload: EventPayloadMapping[K]
) {
  webContents.send(key, payload);
}

export function getUIPath() {
  return path.join(app.getAppPath(), '/dist-react/index.html');
}

function validateEventFrame(frame: WebFrameMain) {
  console.log(frame.url);

  if (isDev() && new URL(frame.url).host === 'localhost:5123')
    return;
  if (frame.url !== pathToFileURL(getUIPath()).toString())
    throw new Error('Malicious event');
}