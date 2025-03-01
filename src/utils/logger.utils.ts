import 'dotenv/config'

import {createLogger, format, transports} from 'winston'

const LOGGING_LEVEL = process.env.LOGGING_LEVEL || 'warning'

const errorStackTracerFormat = format((info) => {
  if (info.stack) {
    info.message = `${info.message}\n> ${info.stack}`
    delete info.stack
  }
  return info
})

const consoleFormat = format.combine(errorStackTracerFormat(), format.colorize(), format.simple())

export const logger = createLogger({
  level: LOGGING_LEVEL,
  transports: new transports.Console({format: consoleFormat}),
})
