import electron from "electron";

electron.contextBridge.exposeInMainWorld("electron", {

  subscribeStatistics: (callback) => ipcOn('statistics', callback),
  subscribeViewChange: (callback) => ipcOn('changeView', callback),
  getStaticData: () => ipcInvoke("getStaticData"),
  sendFrameAction: (frameStatus) => ipcSend("changeFrameAction", frameStatus),
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

function ipcSend<K extends keyof EventPayloadMapping>(
  key: K,
  payload: EventPayloadMapping[K]
) {
  electron.ipcRenderer.send(key, payload);
}

