import cron from "node-cron";

import {
  handleCpuInfo,
  handleDbSize,
  handleDiskSize,
  handleMemoryUsage,
} from "./system-info.js";

export const setupCron = () => {
  // Schedule the task to run every 5 minutes for testing
  cron.schedule("*/5 * * * *", () => {
    handleCpuInfo();
    handleMemoryUsage();
    handleDiskSize();
    handleDbSize();
  });
};
