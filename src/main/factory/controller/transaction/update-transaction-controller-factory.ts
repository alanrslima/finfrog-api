import { UpdateTransactionUseCase } from "../../../../application/use-case/transaction/update-transaction-use-case";
import { AccountMysqlRepository } from "../../../../infra/repository/mysql/account-mysql-repository";
import { CategoryMysqlRepository } from "../../../../infra/repository/mysql/category-mysql-repository";
import { TransactionMysqlRepository } from "../../../../infra/repository/mysql/transaction-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { UpdateTransactionController } from "../../../../presentation/controller/transaction/update-transaction-controller";

export const updateTransactionControllerFactory = (): Controller => {
  const accountMysqlRepository = new AccountMysqlRepository();
  const categoryMysqlRepository = new CategoryMysqlRepository();
  const transactionMysqlRepository = new TransactionMysqlRepository();
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionMysqlRepository,
    accountMysqlRepository,
    categoryMysqlRepository
  );
  const controller = new UpdateTransactionController(updateTransactionUseCase);
  return controller;
};
