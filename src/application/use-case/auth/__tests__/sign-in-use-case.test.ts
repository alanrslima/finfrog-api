import { User } from "../../../../domain/entity/user";
import { InvalidCredentialsError } from "../../../../error/invalid-credentials-error";
import { SessionMemoryRepository } from "../../../../infra/repository/memory/session-memory-repository";
import { UserMemoryRepository } from "../../../../infra/repository/memory/user-memory-repository";
import { SignInUseCase } from "../sign-in-use-case";

it("should not make sign in if the user does not exists", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const sessionMemoryRepository = new SessionMemoryRepository();
  const signInUseCase = new SignInUseCase(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const execute = async () =>
    await signInUseCase.execute({ email: "email@email.com", password: "123" });
  expect(execute).rejects.toThrow(InvalidCredentialsError);
});

it("should not make sign in if the credentials are invalid", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "user",
    rawPassword: "12345678",
  });
  const userMemoryRepository = new UserMemoryRepository([user]);
  const sessionMemoryRepository = new SessionMemoryRepository();
  const signInUseCase = new SignInUseCase(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const execute = async () =>
    await signInUseCase.execute({
      email: user.getEmail(),
      password: "wrong_password",
    });
  expect(execute).rejects.toThrow(InvalidCredentialsError);
});

it("should make sign in if the credentials are valid", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "user",
    rawPassword: "12345678",
  });
  const userMemoryRepository = new UserMemoryRepository([user]);
  const sessionMemoryRepository = new SessionMemoryRepository();
  const signInUseCase = new SignInUseCase(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const response = await signInUseCase.execute({
    email: user.getEmail(),
    password: "12345678",
  });
  expect(response.token).toBeDefined();
});

it("should create a session for the user after login", async () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "user",
    rawPassword: "12345678",
  });
  const userMemoryRepository = new UserMemoryRepository([user]);
  const sessionMemoryRepository = new SessionMemoryRepository();
  const signInUseCase = new SignInUseCase(
    userMemoryRepository,
    sessionMemoryRepository
  );
  const response = await signInUseCase.execute({
    email: user.getEmail(),
    password: "12345678",
  });
  expect(sessionMemoryRepository.getData()).toHaveLength(1);
  expect(sessionMemoryRepository.getData()[0].getUserId()).toEqual(
    user.getId()
  );
  expect(sessionMemoryRepository.getData()[0].getToken()).toEqual(
    response.token
  );
  expect(sessionMemoryRepository.getData()[0].getExpiresAt()).toBeDefined();
  expect(response.token).toBeDefined();
});
