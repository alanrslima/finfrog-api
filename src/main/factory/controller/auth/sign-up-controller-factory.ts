import { SignUpUseCase } from "../../../../application/use-case/auth/sign-up-use-case";
import { UserMysqlRepository } from "../../../../infra/repository/mysql/user-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { SignUpController } from "../../../../presentation/controller/auth/sign-up-controller";

export const signUpControllerFactory = (): Controller => {
  const userMysqlRepository = new UserMysqlRepository();
  const signUpUseCase = new SignUpUseCase(userMysqlRepository);
  const controller = new SignUpController(signUpUseCase);
  return controller;
};
