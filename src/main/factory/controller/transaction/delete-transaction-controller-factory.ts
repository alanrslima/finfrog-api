import { DeleteTransactionUseCase } from "../../../../application/use-case/transaction/delete-transaction-use-case";
import { TransactionMysqlRepository } from "../../../../infra/repository/mysql/transaction-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { DeleteTransactionController } from "../../../../presentation/controller/transaction/delete-transaction-controller";

export const deleteTransactionControllerFactory = (): Controller => {
  const transactionMysqlRepository = new TransactionMysqlRepository();
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    transactionMysqlRepository
  );
  const controller = new DeleteTransactionController(deleteTransactionUseCase);
  return controller;
};
