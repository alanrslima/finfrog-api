import { Id } from "../id";

it("should create a random id", () => {
  const idOne = new Id().getValue();
  const idTwo = new Id().getValue();
  expect(idOne).toBeDefined();
  expect(idTwo).toBeDefined();
  expect(idOne !== idTwo).toBeTruthy();
});
