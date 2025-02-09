// const electron = require('electron');
import electron from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
  // subscribeStatistics: (callback) => {
  //   electron.ipcRenderer.on("statistics", (_, data) => {
  //     callback(data);
  //   })
  // },
  subscribeStatistics: (callback) => ipcOn('statistics', callback),
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window['electron']);


function ipcInvoke<K extends keyof EventPayloadMapping>(key: K)
  : Promise<EventPayloadMapping[K]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<K extends keyof EventPayloadMapping>(
  key: K,
  callback: ((payload: EventPayloadMapping[K]) => void)
) {
  const cb = (_: electron.IpcRendererEvent, payload: EventPayloadMapping[K]) => { callback(payload); };
  electron.ipcRenderer.on(key, cb);
  return () => { electron.ipcRenderer.off(key, cb); };
}

