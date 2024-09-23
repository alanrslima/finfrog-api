import { Goal } from "../../../domain/entity/goal";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { GoalRepository } from "../../contract/repository/goal-repository";
import { UseCase } from "../../contract/use-case";

export class CreateGoalUseCase implements UseCase<Input, Output> {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(input: Input): Promise<Output> {
    const goal = Goal.create({
      initialValue: input.initialValue,
      name: input.name,
      targetDate: input.targetDate,
      targetValue: input.targetValue,
      userId: input.user.id,
    });
    await this.goalRepository.create(goal);
  }
}

type Input = {
  name: string;
  targetValue: number;
  initialValue: number;
  targetDate: string;
  user: LoggedUserDTO;
};

type Output = void;
