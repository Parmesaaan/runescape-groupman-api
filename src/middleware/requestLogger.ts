import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils'

const SENSITIVE_KEYS = [
  'password',
  'token',
  'refreshToken',
  'authorization',
  'apiKey',
  'x-api-key',
  'auth',
]

declare module 'express-serve-static-core' {
  interface Response {
    startTime?: number
  }
}

function maskSensitiveData(data: any): any {
  if (!data || typeof data !== 'object') return data

  return Object.keys(data).reduce(
    (masked, key) => {
      masked[key] = SENSITIVE_KEYS.includes(key.toLowerCase()) ? '****' : data[key]
      return masked
    },
    {} as Record<string, any>,
  )
}

export function logRequest(req: Request, res: Response, next: NextFunction): void {
  const maskedHeaders = maskSensitiveData(req.headers)
  const maskedQuery = maskSensitiveData(req.query)
  const maskedParams = maskSensitiveData(req.params)
  const maskedBody = maskSensitiveData(req.body)

  const logParts = [
    `Incoming: ${req.method} ${req.originalUrl}`,
    `headers: ${Object.keys(maskedHeaders).length ? JSON.stringify(maskedHeaders) : 'none'}`,
    `query: ${Object.keys(maskedQuery).length ? JSON.stringify(maskedQuery) : 'none'}`,
    `params: ${Object.keys(maskedParams).length ? JSON.stringify(maskedParams) : 'none'}`,
    `body: ${Object.keys(maskedBody).length ? JSON.stringify(maskedBody) : 'none'}`,
  ]

  logger.info(logParts.join(', '))

  res.startTime = Date.now()
  next()
}

export function logResponse(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - startTime
    const status = res.statusCode
    const error = status >= 400 ? res.locals?.error || 'Unknown Error' : null

    const logParts = [
      `Outgoing: ${req.method} ${req.originalUrl}`,
      `status: ${status}`,
      `time: ${duration}ms`,
    ]

    if (error) logParts.push(`error: ${JSON.stringify(error)}`)

    logger.info(logParts.join(', '))
  })

  next()
}
