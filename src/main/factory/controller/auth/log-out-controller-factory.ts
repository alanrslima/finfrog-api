import { LogOutUseCase } from "../../../../application/use-case/auth/log-out-use-case";
import { SessionMysqlRepository } from "../../../../infra/repository/mysql/session-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { LogOutController } from "../../../../presentation/controller/auth/log-out-controller";

export const logOutControllerFactory = (): Controller => {
  const sessionMysqlRepository = new SessionMysqlRepository();
  const logOutUseCase = new LogOutUseCase(sessionMysqlRepository);
  const controller = new LogOutController(logOutUseCase);
  return controller;
};
