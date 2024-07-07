import { ForbiddenError } from "../../../error/forbidden-error";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { AccountRepository } from "../../contract/repository/account-repository";
import { UseCase } from "../../contract/use-case";

export class UpdateAccountUseCase implements UseCase<Input, Output> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<void> {
    const account = await this.accountRepository.getById(input.id);
    if (account.getUserId() !== input.user.id) {
      throw new ForbiddenError(
        "O usuário não possui permissão para editar está conta"
      );
    }
    account.setName(input.name);
    account.setInitialValue(input.initialValue);
    await this.accountRepository.update(account);
  }
}

type Input = {
  id: string;
  name: string;
  initialValue: number;
  user: LoggedUserDTO;
};

type Output = void;
