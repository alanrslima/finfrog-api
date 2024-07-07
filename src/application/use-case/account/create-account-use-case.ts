import { Account } from "../../../domain/entity/account";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { AccountRepository } from "../../contract/repository/account-repository";
import { UseCase } from "../../contract/use-case";

export class CreateAccountUseCase implements UseCase<Input, Output> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<void> {
    const account = Account.create({
      name: input.name,
      initialValue: input.initialValue,
      userId: input.user.id,
    });
    await this.accountRepository.create(account);
  }
}

type Input = {
  name: string;
  initialValue: number;
  user: LoggedUserDTO;
};

type Output = void;
