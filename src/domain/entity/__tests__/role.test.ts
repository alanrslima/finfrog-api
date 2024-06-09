import { Role } from "../role";

it("shpuld create a role", () => {
  const role = new Role({ name: "admin" });
  expect(role.getName()).toEqual("admin");
  expect(Array.isArray(role.getPermissions())).toBeTruthy();
});

it("should not create a role if its not available", () => {
  const role = () => new Role({ name: "teste123" as any });
  expect(role).toThrow();
});
