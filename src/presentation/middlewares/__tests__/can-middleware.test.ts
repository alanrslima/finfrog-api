import { ForbiddenError } from "../../../error/forbidden-error";
import { CanMiddleware } from "../can-middleware";

it("should return ok if user has permissions", async () => {
  const canMiddleware = new CanMiddleware(["role.create"]);
  const response = await canMiddleware.handle({
    user: {
      email: "email@email.com",
      id: "2",
      name: "John",
      permissions: ["role.update", "role.create"],
      role: "admin",
    },
  });
  expect(response.statusCode).toEqual(200);
});

it("should return throw an error if the user does not have a role", () => {
  const canMiddleware = new CanMiddleware(["role.create"]);
  const handle = async () => {
    await canMiddleware.handle({
      user: {
        email: "email@email.com",
        id: "2",
        name: "John",
      } as any,
    });
  };
  expect(handle).rejects.toThrow(ForbiddenError);
});

it("should throw an error if user does not have the required permissions", async () => {
  const canMiddleware = new CanMiddleware(["role.create"]);
  expect(
    async () =>
      await canMiddleware.handle({
        user: {
          email: "email@email.com",
          id: "2",
          name: "John",
          permissions: ["role.update"],
          role: "admin",
        },
      })
  ).rejects.toThrow(ForbiddenError);
});
