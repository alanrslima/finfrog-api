import { NextFunction, Response, Request } from "express";
import { Controller } from "../../presentation/contract/controller";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      ...(req.body ?? {}),
      ...(req.params ?? {}),
      ...(req.query ?? {}),
      file: req.file,
      files: req.files,
      user: req?.user,
      session: req?.session,
    };
    try {
      const httpResponse = await controller.handle(request);
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
      } else {
        res.status(httpResponse.statusCode).json({
          message: httpResponse.body.message,
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
