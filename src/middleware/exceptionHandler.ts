import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from 'axios'
import { logger } from '../utils'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error('Unexpected error:', err)
  res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal Server Error' })
}
