import { Middleware } from "../../../presentation/contract/middleware";
import { CanMiddleware } from "../../../presentation/middlewares/can-middleware";

export const canMiddlewareFactory = (permissions: string[]): Middleware => {
  return new CanMiddleware(permissions);
};
