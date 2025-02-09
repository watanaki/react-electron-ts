import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./utils.js";

const POLLING_INTERVAL = 500;

export function pollRes(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageUsage = getStorageData().usage;
    // mainWindow.webContents.send("statistics", {
    //   cpuUsage,
    //   ramUsage,
    //   storageUsage,
    //   staticData,
    // });
    ipcWebContentsSend('statistics', mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage,
    })
  }, POLLING_INTERVAL);
}

function getCpuUsage(): Promise<number> {
  return new Promise((res) => {
    osUtils.cpuUsage(res);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1024 ** 3),
    usage: 1 - free / total
  }
}

export function getStaticData(): StaticData {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryInGB = Math.floor(osUtils.totalmem() * 10 / 1024) / 10;

  return {
    totalStorage,
    cpuModel,
    totalMemoryInGB
  }
}