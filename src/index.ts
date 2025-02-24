import 'dotenv/config'
import 'reflect-metadata'
import {AppDataSource} from "../ormconfig"
import {initApp} from "./app"
import http from 'http'
import {SERVER_PORT} from "./config";
import {logger} from "./utils";

const startTime = new Date().getMilliseconds()

async function initDataSource(): Promise<void> {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize()
}

try {
    initDataSource()
        .then(() => {
            const app = initApp()
            const server = http.createServer(app)

            server.listen(SERVER_PORT, () => {
                const serverStartDuration = new Date().getMilliseconds() - startTime
            })
        })
        .catch(e => {
            throw e
        })
} catch (e) {
    logger.error('Server failed to start:', e)
    process.exit(-1)
}