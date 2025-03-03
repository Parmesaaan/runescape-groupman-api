import { User } from '../models'
import jwt, { SignOptions } from 'jsonwebtoken'
import { jwtConfig } from '../config'
import { OperationResult } from '../types'
import { opFailure, opSuccess } from './operations.utils'
import { logger } from './logger.utils'

export type TokenPair = {
  token: string
  refresh: string
}

export const generateAccessToken = (user: User): string => {
  const secret: string = jwtConfig.jwtSecret
  const expiry: string = jwtConfig.jwtExpiry

  // @ts-ignore
  const options: SignOptions = { expiresIn: expiry }
  return jwt.sign({ id: user.id, permissionLevel: user.permissionLevel }, secret, options)
}

export const generateRefreshToken = (user: User): string => {
  const secret: string = jwtConfig.jwtRefreshSecret
  const expiry: string = jwtConfig.jwtRefreshExpiry

  // @ts-ignore
  const options: SignOptions = { expiresIn: expiry }
  return jwt.sign({ id: user.id, permissionLevel: user.permissionLevel }, secret, options)
}

export const generateTokenPair = (
  user: User,
): {
  token: string
  refresh: string
} => {
  return { token: generateAccessToken(user), refresh: generateRefreshToken(user) }
}

export const verifyAccessToken = (token: string): OperationResult => {
  const secret: string = jwtConfig.jwtSecret

  try {
    const decoded = jwt.verify(token, secret)
    return opSuccess(decoded as User)
  } catch (e) {
    logger.debug('Failed to verify access token', e)
    return opFailure()
  }
}

export const verifyRefreshToken = (token: string): OperationResult => {
  const secret: string = jwtConfig.jwtRefreshSecret

  try {
    const decoded = jwt.verify(token, secret)
    return opSuccess(decoded as User)
  } catch (e) {
    logger.debug('Failed to verify refresh token', e)
    return opFailure()
  }
}
