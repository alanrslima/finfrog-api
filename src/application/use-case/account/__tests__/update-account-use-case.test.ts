import { Account } from "../../../../domain/entity/account";
import { ForbiddenError } from "../../../../error/forbidden-error";
import { AccountMemoryRepository } from "../../../../infra/repository/memory/account-memory-repository";
import { UpdateAccountUseCase } from "../update-account-use-case";

it("should not update the account if the user is not the owner", () => {
  const account = Account.create({
    name: "name",
    userId: "789",
    initialValue: 200,
  });
  const accountMemoryRepository = new AccountMemoryRepository([account]);
  const updateAccountUseCase = new UpdateAccountUseCase(
    accountMemoryRepository
  );
  const execute = async () =>
    await updateAccountUseCase.execute({
      id: account.getId(),
      initialValue: 100,
      name: "test",
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
  const updateAccountUseCase = new UpdateAccountUseCase(
    accountMemoryRepository
  );
  await updateAccountUseCase.execute({
    id: account.getId(),
    initialValue: 100,
    name: "test",
    user: { id: "123", permissions: [], role: "admin" },
  });
  expect(accountMemoryRepository.getData()[0].getName()).toEqual("test");
  expect(accountMemoryRepository.getData()[0].getInitialValue()).toEqual(100);
});
