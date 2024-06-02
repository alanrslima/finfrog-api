import { Name } from "../name";

it("should create a name", () => {
  const name = new Name("john");
  expect(name.getValue()).toBe("john");
});

it("should not create a invalid name", () => {
  const name = () => new Name("mary123");
  expect(name).toThrow();
});
