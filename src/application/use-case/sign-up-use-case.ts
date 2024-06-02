import { User } from "../../domain/entity/user";
import { UserAlreadyExistsError } from "../../error/user-already-exists-error";
import { UserRepository } from "../contract/repository/user-repository";
import { UseCase } from "../contract/use-case";

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.getByEmail(input.email);
    if (user) {
      throw new UserAlreadyExistsError();
    }
    const newUser = User.create({
      email: input.email,
      name: input.name,
      rawPassword: input.password,
    });
    await this.userRepository.create(newUser);
  }
}

type Input = {
  name: string;
  email: string;
  password?: string;
};

type Output = void;
