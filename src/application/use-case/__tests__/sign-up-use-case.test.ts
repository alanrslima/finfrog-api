import { User } from "../../../domain/entity/user";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { SignUpUseCase } from "../sign-up-use-case";

it("should not sign up if email already exists", async () => {
  const mockUser = User.create({
    email: "john@email.com",
    name: "john",
    rawPassword: "12345678",
  });
  const userMemoryRepository = new UserMemoryRepository([mockUser]);
  const signUpUseCase = new SignUpUseCase(userMemoryRepository);
  const createUser = async () => {
    await signUpUseCase.execute({
      email: "john@email.com",
      name: "john",
      password: "12345678",
    });
  };
  expect(createUser).rejects.toThrow();
});

it("should sign up", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const signUpUseCase = new SignUpUseCase(userMemoryRepository);
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
