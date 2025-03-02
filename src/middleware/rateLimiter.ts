import rateLimit from 'express-rate-limit'

export const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  message: 'Too many signup attempts, please try again later.',
})

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  message: 'Too many login attempts, please try again later.'
})

export const refreshTokenLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 1,
  message: 'Too many refresh token attempts, please try again later.'
})