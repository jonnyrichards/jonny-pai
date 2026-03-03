const path = require("path");

const HOME = process.env.HOME || process.env.USERPROFILE;
const LOG_DIR = path.join(HOME, ".pai", "logs");

module.exports = {
  apps: [
    {
      name: "pai",
      script: "node_modules/.bin/tsx",
      args: "--watch src/index.ts",
      cwd: __dirname,
      watch: false, // tsx --watch handles reloads
      max_memory_restart: "500M",
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 10,
      error_file: path.join(LOG_DIR, "pai-error.log"),
      out_file: path.join(LOG_DIR, "pai-out.log"),
      merge_logs: true,
      time: true,
    },
  ],
};
