import { SessionRepository } from "../../contract/repository/session-repository";
import { UseCase } from "../../contract/use-case";

export class LogOutUseCase implements UseCase<Input, Output> {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(input: Input): Promise<void> {
    await this.sessionRepository.deleteById(input.session.id);
  }
}

type Input = {
  session: { id: string };
};

type Output = void;
