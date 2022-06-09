import { Request, Response, NextFunction } from "express";
import { HttpException } from "./exceptions/exceptions";
import { BaseException } from "./exceptions/base-exception";
import { logger } from "./logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(err);

  let error: HttpException;
  if (err instanceof BaseException) {
    const message = err.message?.replace(/\n/g, "").trim();
    error = new HttpException(err.name, err.status, message);
  } else {
    error = new HttpException();
  }
  return res.status(error.status).json(error).end();
};
