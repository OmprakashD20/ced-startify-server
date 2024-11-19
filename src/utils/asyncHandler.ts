import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import { AsyncHandlerReturn } from "@/types";
import { HTTPError, ServerError } from "@/utils/errors";

export default function AsyncHandler<
  T,
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response
  ) => Promise<AsyncHandlerReturn<T>>
) {
  return async (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { statusCode, ...data } = await fn(req, res);

      const success = statusCode < 400;

      res.status(statusCode).json({ success, data });
    } catch (error: any) {
      console.log(error);
      if (error instanceof HTTPError) next(error);
      else throw new ServerError();
    }
  };
}
