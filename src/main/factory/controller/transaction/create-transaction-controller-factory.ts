import { CreateTransactionUseCase } from "../../../../application/use-case/transaction/create-transaction-use-case";
import { AccountMysqlRepository } from "../../../../infra/repository/mysql/account-mysql-repository";
import { CategoryMysqlRepository } from "../../../../infra/repository/mysql/category-mysql-repository";
import { TransactionMysqlRepository } from "../../../../infra/repository/mysql/transaction-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { CreateTransactionController } from "../../../../presentation/controller/transaction/create-transaction-controller";

export const createTransactionControllerFactory = (): Controller => {
  const accountMysqlRepository = new AccountMysqlRepository();
  const categoryMysqlRepository = new CategoryMysqlRepository();
  const transactionMysqlRepository = new TransactionMysqlRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionMysqlRepository,
    accountMysqlRepository,
    categoryMysqlRepository
  );
  const controller = new CreateTransactionController(createTransactionUseCase);
  return controller;
};
