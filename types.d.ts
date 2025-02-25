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

type View = 'cpu' | 'CPU' | 'ram' | 'RAM' | 'storage' | 'STORAGE';

type EventPayloadMapping = {
  statistics: Statistics,
  getStaticData: StaticData,
  changeView: View,
}

type UnsubscribeFunc = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunc,
    subscribeViewChange: (callback: (view: View) => void) => UnsubscribeFunc,
    getStaticData: () => Promise<StaticData>
  }
}