import { DeleteAccountUseCase } from "../../../../application/use-case/account/delete-account-use-case";
import { AccountMysqlRepository } from "../../../../infra/repository/mysql/account-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { DeleteAccountController } from "../../../../presentation/controller/account/delete-account-controller";

export const deleteAccountControllerFactory = (): Controller => {
  const accountMysqlRepository = new AccountMysqlRepository();
  const deleteAccountUseCase = new DeleteAccountUseCase(accountMysqlRepository);
  const controller = new DeleteAccountController(deleteAccountUseCase);
  return controller;
};
