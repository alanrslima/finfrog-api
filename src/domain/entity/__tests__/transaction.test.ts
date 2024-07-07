import { Transaction } from "../transaction";

it("should not create a transaction with invalid value", () => {
  const execute = () =>
    Transaction.create({
      accountId: "123",
      date: new Date().toISOString(),
      name: "Test",
      userId: "123",
      value: "invalid_value" as any,
      categoryId: "123",
      notes: "",
    });
  expect(execute).toThrow();
});

it("should create a transaction", () => {
  const transaction = Transaction.create({
    accountId: "123",
    date: new Date().toISOString(),
    name: "Test",
    userId: "123",
    value: -120,
    categoryId: "123",
    notes: "",
  });
  expect(transaction.getValue()).toEqual(-120);
  expect(transaction.getName()).toEqual("Test");
});
