import 'dotenv/config'
import 'reflect-metadata'
import {AppDataSource, SERVER_PORT} from './config'
import {initApp} from './app'
import http from 'http'
import {logger} from './utils'

const startTime = new Date().getMilliseconds()

async function initDataSource(): Promise<void> {
  logger.debug('Initializing data sources')
  if (!AppDataSource.isInitialized) await AppDataSource.initialize()
  logger.debug('Data sources initialized')
}

try {
  initDataSource()
  .then(() => {
    const app = initApp()
    const server = http.createServer(app)

    server.listen(SERVER_PORT, () => {
      const serverStartDuration = new Date().getMilliseconds() - startTime
      logger.info(
        `Server start successfully on port ${SERVER_PORT} in ${serverStartDuration}ms`,
      )
    })
  })
  .catch((e) => {
    throw e
  })
} catch (e) {
  logger.error('Server failed to start:', e)
  process.exit(-1)
}
