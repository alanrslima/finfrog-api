import { SignUpUseCase } from "../../../../application/use-case/auth/sign-up-use-case";
import { UserCreatedNodeEvent } from "../../../../infra/event/user-created-node-event";
import { UserMysqlRepository } from "../../../../infra/repository/mysql/user-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { SignUpController } from "../../../../presentation/controller/auth/sign-up-controller";

export const signUpControllerFactory = (): Controller => {
  const userMysqlRepository = new UserMysqlRepository();
  const userCreatedNodeEvent = new UserCreatedNodeEvent();
  const signUpUseCase = new SignUpUseCase(
    userMysqlRepository,
    userCreatedNodeEvent
  );
  const controller = new SignUpController(signUpUseCase);
  return controller;
};
