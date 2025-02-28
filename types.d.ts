type Statistics = {
  cpuUsage: number,
  ramUsage: number,
  storageUsage: number,
};

type StaticData = {
  totalStorage: number,
  cpuModel: string,
  totalMemoryInGB: number,
};

type View = 'CPU' | 'RAM' | 'STORAGE';
type FrameWindowAction = "close" | "maximize" | "minimize";

type EventPayloadMapping = {
  statistics: Statistics,
  getStaticData: StaticData,
  changeView: View,
  changeFrameAction: FrameWindowAction,
}

type UnsubscribeFunc = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunc,
    subscribeViewChange: (callback: (view: View) => void) => UnsubscribeFunc,
    getStaticData: () => Promise<StaticData>,
    sendFrameAction: (frameStatus: FrameWindowAction) => void,
  }
}