/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Request, type Response, type NextFunction } from "express";
import { BaseError } from "../../error/base-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof BaseError) {
    res.status(err.statusCode).send({ errors: err.serialize() });
    res.statusCode = err.statusCode;
  } else {
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
    res.statusCode = 500;
  }
};
