import { AccountMysqlQuery } from "../../../../infra/query/mysql/account-mysql-query";
import { Controller } from "../../../../presentation/contract/controller";
import { ListAccountsController } from "../../../../presentation/controller/account/list-accounts-controller";

export const listAccountsControllerFactory = (): Controller => {
  const accountMysqlQuery = new AccountMysqlQuery();
  const controller = new ListAccountsController(accountMysqlQuery);
  return controller;
};
