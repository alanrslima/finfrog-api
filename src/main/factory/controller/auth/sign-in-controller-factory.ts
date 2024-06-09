import { SignInUseCase } from "../../../../application/use-case/auth/sign-in-use-case";
import { SessionMysqlRepository } from "../../../../infra/repository/mysql/session-mysql-repository";
import { UserMysqlRepository } from "../../../../infra/repository/mysql/user-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { SignInController } from "../../../../presentation/controller/auth/sign-in-controller";

export const signInControllerFactory = (): Controller => {
  const userMysqlRepository = new UserMysqlRepository();
  const sessionMysqlRepository = new SessionMysqlRepository();
  const signInUseCase = new SignInUseCase(
    userMysqlRepository,
    sessionMysqlRepository
  );
  const controller = new SignInController(signInUseCase);
  return controller;
};
