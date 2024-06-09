import { Session } from "../../../domain/entity/session";
import { User } from "../../../domain/entity/user";
import { NotAuthorizedError } from "../../../error/not-authorized-error";
import { SessionMemoryRepository } from "../../../infra/repository/memory/session-memory-repository";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { AuthMiddleware } from "../auth-middleware";

it("should throw an error if not token provided", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const sessionMemoryRepository = new SessionMemoryRepository();
  const authMiddleware = new AuthMiddleware(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const handle = async () => await authMiddleware.handle({});
  expect(handle).rejects.toThrow(NotAuthorizedError);
});

it("should throw an error if the token are invalid", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const sessionMemoryRepository = new SessionMemoryRepository();
  const authMiddleware = new AuthMiddleware(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const handle = async () =>
    await authMiddleware.handle({ authorization: "invalid_token" });
  expect(handle).rejects.toThrow(NotAuthorizedError);
});

it("should throw an error if the token are valid but the user are not registered", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
  });
  const session = Session.createWithoutPassword({ user });
  const userMemoryRepository = new UserMemoryRepository();
  const sessionMemoryRepository = new SessionMemoryRepository();
  const authMiddleware = new AuthMiddleware(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const handle = async () =>
    await authMiddleware.handle({
      authorization: `Bearer ${session.getToken()}`,
    });
  expect(handle).rejects.toThrow(NotAuthorizedError);
});

it("should throw an error if token are valid, user is registered but session does not exists", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
  });
  const session = Session.createWithoutPassword({ user });
  const userMemoryRepository = new UserMemoryRepository([user]);
  const sessionMemoryRepository = new SessionMemoryRepository();
  const authMiddleware = new AuthMiddleware(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const handle = async () =>
    await authMiddleware.handle({
      authorization: `Bearer ${session.getToken()}`,
    });
  expect(handle).rejects.toThrow();
});

it("should return user data if the token are valid and the user is registered", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
  });
  const session = Session.createWithoutPassword({ user });
  const userMemoryRepository = new UserMemoryRepository([user]);
  const sessionMemoryRepository = new SessionMemoryRepository();
  await sessionMemoryRepository.create(session);
  const authMiddleware = new AuthMiddleware(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const response = await authMiddleware.handle({
    authorization: `Bearer ${session.getToken()}`,
  });
  expect(response.statusCode).toEqual(200);
  expect(response.body.user).toBeDefined();
  expect(response.body.user.id).toEqual(user.getId());
  expect(response.body.user.name).toEqual(user.getName());
  expect(response.body.user.email).toEqual(user.getEmail());
  expect(response.body.user.role).toEqual(user.getRole());
  expect(response.body.user.permissions).toEqual(user.getPermissions());
});
