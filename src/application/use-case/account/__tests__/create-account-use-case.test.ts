import { AccountMemoryRepository } from "../../../../infra/repository/memory/account-memory-repository";
import { CreateAccountUseCase } from "../create-account-use-case";

it("should create an account", async () => {
  const accountMemoryRepository = new AccountMemoryRepository();
  const createAccountUseCase = new CreateAccountUseCase(
    accountMemoryRepository
  );
  await createAccountUseCase.execute({
    initialValue: -1000,
    name: "Carteira",
    user: { id: "123", permissions: [], role: "admin" },
  });
  expect(accountMemoryRepository.getData()).toHaveLength(1);
  const createdAccount = accountMemoryRepository.getData()[0];
  expect(createdAccount.getId()).toBeDefined();
  expect(createdAccount.getName()).toEqual("Carteira");
  expect(createdAccount.getInitialValue()).toEqual(-1000);
  expect(createdAccount.getUserId()).toEqual("123");
});
