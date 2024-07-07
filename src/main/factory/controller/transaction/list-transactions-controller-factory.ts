import { TransactionMysqlQuery } from "../../../../infra/query/mysql/transaction-mysql-query";
import { Controller } from "../../../../presentation/contract/controller";
import { ListTransactionsController } from "../../../../presentation/controller/transaction/list-transactions-controller";

export const listTransactionsControllerFactory = (): Controller => {
  const transactionMysqlQuery = new TransactionMysqlQuery();
  const controller = new ListTransactionsController(transactionMysqlQuery);
  return controller;
};
