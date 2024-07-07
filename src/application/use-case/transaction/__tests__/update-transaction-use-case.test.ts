import { Account } from "../../../../domain/entity/account";
import { Category } from "../../../../domain/entity/category";
import { Transaction } from "../../../../domain/entity/transaction";
import { ForbiddenError } from "../../../../error/forbidden-error";
import { ResourceNotFoundError } from "../../../../error/resource-not-found-error";
import { AccountMemoryRepository } from "../../../../infra/repository/memory/account-memory-repository";
import { CategoryMemoryRepository } from "../../../../infra/repository/memory/category-memory-repository";
import { TransactionMemoryRepository } from "../../../../infra/repository/memory/transaction-memory-repository";
import { UpdateTransactionUseCase } from "../update-transaction-use-case";

it("should not update a transaction if the account does not exists", () => {
  const transactionMemoryRepository = new TransactionMemoryRepository();
  const categoryMemoryRepository = new CategoryMemoryRepository();
  const accountRepository = new AccountMemoryRepository();
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionMemoryRepository,
    accountRepository,
    categoryMemoryRepository
  );
  const execute = async () =>
    await updateTransactionUseCase.execute({
      id: "123",
      categoryId: "123",
      notes: "notes",
      accountId: "123",
      date: new Date().toISOString(),
      value: 100,
      name: "Test",
      user: { id: "123", permissions: [], role: "role" },
    });
  expect(execute).rejects.toThrow(ResourceNotFoundError);
});

it("should not update a transaction if the account is not allowed to the user", () => {
  const account = Account.create({
    name: "carteira",
    userId: "123",
  });
  const transactionMemoryRepository = new TransactionMemoryRepository();
  const categoryMemoryRepository = new CategoryMemoryRepository();
  const accountRepository = new AccountMemoryRepository([account]);
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionMemoryRepository,
    accountRepository,
    categoryMemoryRepository
  );
  const execute = async () =>
    await updateTransactionUseCase.execute({
      id: "123",
      categoryId: "123",
      notes: "notes",
      accountId: account.getId(),
      date: new Date().toISOString(),
      value: 100,
      name: "Test",
      user: { id: "789", permissions: [], role: "role" },
    });
  expect(execute).rejects.toThrow(ForbiddenError);
});

it("should not update a transaction if the category is not allowed to the user", () => {
  const account = Account.create({
    name: "carteira",
    userId: "123",
  });
  const category = Category.create({
    name: "mercado",
    userId: "123",
  });
  const transactionMemoryRepository = new TransactionMemoryRepository();
  const categoryMemoryRepository = new CategoryMemoryRepository([category]);
  const accountRepository = new AccountMemoryRepository([account]);
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionMemoryRepository,
    accountRepository,
    categoryMemoryRepository
  );
  const execute = async () =>
    await updateTransactionUseCase.execute({
      accountId: account.getId(),
      date: new Date().toISOString(),
      value: 100,
      id: "123",
      notes: "notes",
      name: "Test",
      categoryId: category.getId(),
      user: { id: "789", permissions: [], role: "role" },
    });
  expect(execute).rejects.toThrow(ForbiddenError);
});

it("should update a transaction", async () => {
  const account = Account.create({
    name: "carteira",
    userId: "123",
  });
  const category = Category.create({
    name: "mercado",
    userId: "123",
  });
  const transaction = Transaction.create({
    accountId: account.getId(),
    date: new Date().toISOString(),
    name: "transaction",
    userId: "123",
    value: 50,
    categoryId: category.getId(),
    notes: "notes",
  });
  const transactionMemoryRepository = new TransactionMemoryRepository([
    transaction,
  ]);
  const categoryMemoryRepository = new CategoryMemoryRepository([category]);
  const accountRepository = new AccountMemoryRepository([account]);
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    transactionMemoryRepository,
    accountRepository,
    categoryMemoryRepository
  );
  await updateTransactionUseCase.execute({
    id: transaction.getId(),
    notes: "notes",
    accountId: account.getId(),
    date: new Date().toISOString(),
    value: 100,
    name: "Test",
    categoryId: category.getId(),
    user: { id: "123", permissions: [], role: "role" },
  });
  expect(transactionMemoryRepository.getData()).toHaveLength(1);
  const createdTrensaction = transactionMemoryRepository.getData()[0];
  expect(createdTrensaction.getName()).toEqual("Test");
  expect(createdTrensaction.getValue()).toEqual(100);
});
