import { NextFunction, Request, Response } from "express"

export const setContentTypePolicy = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header("Content-Type", "application/jsoncharset=utf-8")
  res.header("Accept", "application/jsoncharset=utf-8")
  next()
}