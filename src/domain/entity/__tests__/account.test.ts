import { Account } from "../account";

it("should not create an account without parameters", () => {
  const handle = () => Account.create({} as any);
  expect(handle).toThrow();
});

it("should create an account", () => {
  const account = Account.create({
    name: "Carteira",
    initialValue: 200,
    userId: "123",
  });
  expect(account.getInitialValue()).toEqual(200);
  expect(account.getName()).toEqual("Carteira");
  expect(account.getUserId()).toEqual("123");
});
