import { adaptMiddleware } from "../adapter/express-middleware-adapter";
import { authMiddlewareFactory } from "../factory/middleware/auth-middleware-factory";

export const auth = adaptMiddleware(authMiddlewareFactory());
