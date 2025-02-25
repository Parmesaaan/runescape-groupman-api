import { NextFunction, Request, Response } from "express";

export const setContentTypePolicy = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Accept", "application/json;charset=utf-8");
  next();
};