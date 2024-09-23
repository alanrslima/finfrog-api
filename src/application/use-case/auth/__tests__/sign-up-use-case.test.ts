import { User } from "../../../../domain/entity/user";
import { UserCreatedNodeEvent } from "../../../../infra/event/user-created-node-event";
import { UserMemoryRepository } from "../../../../infra/repository/memory/user-memory-repository";
import { SignUpUseCase } from "../sign-up-use-case";

it("should not sign up if email already exists", async () => {
  const mockUser = User.create({
    email: "john@email.com",
    name: "john",
    rawPassword: "12345678",
    role: "user",
  });
  const userMemoryRepository = new UserMemoryRepository([mockUser]);
  const userCreatedNodeEvent = new UserCreatedNodeEvent();
  const signUpUseCase = new SignUpUseCase(
    userMemoryRepository,
    userCreatedNodeEvent
  );
  const createUser = async () => {
    await signUpUseCase.execute({
      email: "john@email.com",
      name: "john",
      password: "12345678",
    });
  };
  expect(createUser).rejects.toThrow();
});

it("should not sign up with invalid parameters", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const userCreatedNodeEvent = new UserCreatedNodeEvent();
  const signUpUseCase = new SignUpUseCase(
    userMemoryRepository,
    userCreatedNodeEvent
  );
  const signUp = async () => await signUpUseCase.execute({} as any);
  expect(signUp).rejects.toThrow();
});

it("should sign up", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const userCreatedNodeEvent = new UserCreatedNodeEvent();
  const signUpUseCase = new SignUpUseCase(
    userMemoryRepository,
    userCreatedNodeEvent
  );
  await signUpUseCase.execute({
    email: "john@email.com",
    name: "john",
    password: "12345678",
  });
  const createdUser = await userMemoryRepository.getByEmail("john@email.com");
  expect(createdUser).toBeDefined();
  expect(createdUser?.getEmail()).toEqual("john@email.com");
  expect(createdUser?.getName()).toEqual("john");
});
