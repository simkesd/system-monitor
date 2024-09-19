import si from "systeminformation";
import fs from "fs";
import { sendMessage } from "./telegram.js";

const CPU_LOAD_THRESHOLD = 50;
const MEMORY_USAGE_PERCENTAGE_THRESHOLD = 80;
const DISK_USAGE_PERCENTAGE_THRESHOLD = 50;
const DB_SIZE_THRESHOLD = 100;

const dbPath = process.env.DATABASE_PATH;

export function getDatabaseSizeInMB() {
  const stats = fs.statSync(dbPath);
  const fileSizeInBytes = stats.size;
  const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2); // Convert bytes to MB

  return fileSizeInMB;
}

export const handleCpuInfo = async () => {
  const cpu = await si.currentLoad();
  const cpuUsage = `${cpu.currentLoad.toFixed(2)}%`;

  if (cpuUsage > CPU_LOAD_THRESHOLD) {
    sendMessage(
      `CPU usage exceeded the threshold. Current usage: ${cpuUsage}%.`
    );
  }
};

export const handleMemoryUsage = async () => {
  const memory = await si.mem();
  const totalMemory = (memory.total / 1024 ** 3).toFixed(2) + " GB";
  const usedMemory = (memory.active / 1024 ** 3).toFixed(2) + " GB";
  const memoryUsagePercentage = (memory.active / memory.total) * 100;
  const memoryUsage = `${memoryUsagePercentage.toFixed(2)}%`;

  if (memoryUsagePercentage > MEMORY_USAGE_PERCENTAGE_THRESHOLD) {
    sendMessage(`
         Memory usage exceeded the threshold. 
 * Current usage: ${usedMemory}
 * Total memory: ${totalMemory} 
 * Percentage: ${memoryUsage}
 `);
  }
};

export const handleDiskSize = async () => {
  const disks = await si.fsSize();

  // Find the largest disk partition
  const largestDisk = disks.reduce((prev, current) => {
    return prev.size > current.size ? prev : current;
  });

  if (largestDisk.use > DISK_USAGE_PERCENTAGE_THRESHOLD) {
    sendMessage(`
Disk usage exceeded the threshold. 
* Filesystem: ${largestDisk.fs}
* Current usage: ${largestDisk.use}%
* Size: ${(largestDisk.size / 1024 ** 3).toFixed(2)} GB
* Used: ${(largestDisk.used / 1024 ** 3).toFixed(2)} GB
`);
  }
};

export const handleDbSize = async () => {
  const databaseSize = getDatabaseSizeInMB();

  if (databaseSize > DB_SIZE_THRESHOLD) {
    sendMessage(
      `Database size exceeded the threshold. Current size: ${databaseSize} MB`
    );
  }
};
