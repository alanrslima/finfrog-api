import { User } from "../../../domain/entity/user";
import { UserAlreadyExistsError } from "../../../error/user-already-exists-error";
import { UserCreatedEvent } from "../../contract/event/user-created-event";
import { UserRepository } from "../../contract/repository/user-repository";
import { UseCase } from "../../contract/use-case";

export class SignUpUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCreatedEvent: UserCreatedEvent
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.getByEmail(input.email);
    if (user) {
      throw new UserAlreadyExistsError();
    }
    const newUser = User.create({
      email: input.email,
      name: input.name,
      rawPassword: input.password,
      role: "free-trial",
    });
    await this.userRepository.create(newUser);
    this.userCreatedEvent.emit({
      id: newUser.getId(),
      email: newUser.getEmail(),
      name: newUser.getName(),
    });
  }
}

type Input = {
  name: string;
  email: string;
  password?: string;
};

type Output = void;
