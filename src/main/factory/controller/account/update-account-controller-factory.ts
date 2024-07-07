import { UpdateAccountUseCase } from "../../../../application/use-case/account/update-account-use-case";
import { AccountMysqlRepository } from "../../../../infra/repository/mysql/account-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { UpdateAccountController } from "../../../../presentation/controller/account/update-account-controller";

export const updateAccountControllerFactory = (): Controller => {
  const accountMysqlRepository = new AccountMysqlRepository();
  const updateAccountUseCase = new UpdateAccountUseCase(accountMysqlRepository);
  const controller = new UpdateAccountController(updateAccountUseCase);
  return controller;
};
