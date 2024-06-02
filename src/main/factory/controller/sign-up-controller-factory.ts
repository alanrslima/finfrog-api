import { SignUpUseCase } from "../../../application/use-case/sign-up-use-case";
import { UserMemoryRepository } from "../../../infra/repository/memory/user-memory-repository";
import { Controller } from "../../../presentation/contract/controller";
import { SignUpController } from "../../../presentation/controller/sign-up-controller";

export const signUpControllerFactory = (): Controller => {
  const userMemoryRepository = new UserMemoryRepository();
  const signUpUseCase = new SignUpUseCase(userMemoryRepository);
  const controller = new SignUpController(signUpUseCase);
  return controller;
};
