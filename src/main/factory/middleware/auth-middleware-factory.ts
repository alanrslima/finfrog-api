import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";
import { UserMysqlRepository } from "../../../infra/repository/mysql/user-mysql-repository";
import { Middleware } from "../../../presentation/contract/middleware";
import { SessionMysqlRepository } from "../../../infra/repository/mysql/session-mysql-repository";

export const authMiddlewareFactory = (): Middleware => {
  const userMysqlRepository = new UserMysqlRepository();
  const sessionMysqlRepository = new SessionMysqlRepository();
  return new AuthMiddleware(userMysqlRepository, sessionMysqlRepository);
};
