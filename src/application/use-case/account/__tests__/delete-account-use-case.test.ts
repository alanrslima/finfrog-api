import { Account } from "../../../../domain/entity/account";
import { ForbiddenError } from "../../../../error/forbidden-error";
import { AccountMemoryRepository } from "../../../../infra/repository/memory/account-memory-repository";
import { DeleteAccountUseCase } from "../delete-account-use-case";

it("should not delete the account if the user is not the owner", () => {
  const account = Account.create({
    name: "name",
    userId: "789",
    initialValue: 200,
  });
  const accountMemoryRepository = new AccountMemoryRepository([account]);
  const deleteAccountUseCase = new DeleteAccountUseCase(
    accountMemoryRepository
  );
  const execute = async () =>
    await deleteAccountUseCase.execute({
      id: account.getId(),
      user: { id: "123", permissions: [], role: "admin" },
    });
  expect(execute).rejects.toThrow(ForbiddenError);
});

it("should not delete the account", async () => {
  const account = Account.create({
    name: "name",
    userId: "123",
    initialValue: 200,
  });
  const accountMemoryRepository = new AccountMemoryRepository([account]);
  const deleteAccountUseCase = new DeleteAccountUseCase(
    accountMemoryRepository
  );
  expect(accountMemoryRepository.getData()).toHaveLength(1);
  await deleteAccountUseCase.execute({
    id: account.getId(),
    user: { id: "123", permissions: [], role: "admin" },
  });
  expect(accountMemoryRepository.getData()).toHaveLength(0);
});
