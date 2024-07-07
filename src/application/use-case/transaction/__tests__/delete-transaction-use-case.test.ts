import { Transaction } from "../../../../domain/entity/transaction";
import { ForbiddenError } from "../../../../error/forbidden-error";
import { ResourceNotFoundError } from "../../../../error/resource-not-found-error";
import { TransactionMemoryRepository } from "../../../../infra/repository/memory/transaction-memory-repository";
import { DeleteTransactionUseCase } from "../delete-transaction-use-case";

it("should not delete a transaction if the user is not allowed", () => {
  const transaction = Transaction.create({
    accountId: "123",
    date: new Date().toISOString(),
    name: "transaction",
    userId: "789",
    value: 100,
    categoryId: "123",
    notes: "notes",
  });
  const transactionMemoryRepository = new TransactionMemoryRepository([
    transaction,
  ]);
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    transactionMemoryRepository
  );
  const execute = async () =>
    await deleteTransactionUseCase.execute({
      id: transaction.getId(),
      user: { id: "123", permissions: [], role: "admin" },
    });
  expect(execute).rejects.toThrow(ForbiddenError);
});

it("should not delete a transaction if does not exists", () => {
  const transactionMemoryRepository = new TransactionMemoryRepository();
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    transactionMemoryRepository
  );
  const execute = async () =>
    await deleteTransactionUseCase.execute({
      id: "123",
      user: { id: "123", permissions: [], role: "admin" },
    });
  expect(execute).rejects.toThrow(ResourceNotFoundError);
});

it("should delete a transaction", async () => {
  const transaction = Transaction.create({
    accountId: "123",
    date: new Date().toISOString(),
    name: "transaction",
    userId: "123",
    value: 100,
    categoryId: "123",
    notes: "notes",
  });
  const transactionMemoryRepository = new TransactionMemoryRepository([
    transaction,
  ]);
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    transactionMemoryRepository
  );
  await deleteTransactionUseCase.execute({
    id: transaction.getId(),
    user: { id: "123", permissions: [], role: "admin" },
  });
  expect(transactionMemoryRepository.getData()).toHaveLength(0);
});
