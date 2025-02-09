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

type EventPayloadMapping = {
  statistics: Statistics,
  getStaticData: StaticData,
}

type UnsubscribeFunc = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunc,
    getStaticData: () => Promise<StaticData>
  }
}