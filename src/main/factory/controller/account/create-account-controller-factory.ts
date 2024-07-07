import { CreateAccountUseCase } from "../../../../application/use-case/account/create-account-use-case";
import { AccountMysqlRepository } from "../../../../infra/repository/mysql/account-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { CreateAccountController } from "../../../../presentation/controller/account/create-account-controller";

export const createAccountControllerFactory = (): Controller => {
  const accountMysqlRepository = new AccountMysqlRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountMysqlRepository);
  const controller = new CreateAccountController(createAccountUseCase);
  return controller;
};
