import "dotenv/config";
import "reflect-metadata";
import { AppDataSource, SERVER_PORT } from "./config";
import { initApp } from "./app";
import http from "http";
import { loggerUtils } from "./utils";

const startTime = new Date().getMilliseconds();

async function initDataSource(): Promise<void> {
  loggerUtils.debug("Initializing data sources");
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  loggerUtils.debug("Data sources initialized");
}

try {
  initDataSource()
    .then(() => {
      const app = initApp();
      const server = http.createServer(app);

      server.listen(SERVER_PORT, () => {
        const serverStartDuration = new Date().getMilliseconds() - startTime;
        loggerUtils.info(
          `Server start successfully on port ${SERVER_PORT} in ${serverStartDuration}ms`,
        );
      });
    })
    .catch((e) => {
      throw e;
    });
} catch (e) {
  loggerUtils.error("Server failed to start:", e);
  process.exit(-1);
}