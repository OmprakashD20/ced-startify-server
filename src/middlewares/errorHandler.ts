import { NextFunction, Request, Response } from "express";

import { HTTPError } from "@/utils/errors";

export default function ErrorHandler(
  err: HTTPError,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const statusCode = err.status;

  res.status(statusCode).json({
    [err.error]: err.message,
  });
}
