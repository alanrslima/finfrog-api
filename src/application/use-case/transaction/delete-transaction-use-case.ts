import { ForbiddenError } from "../../../error/forbidden-error";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { TransactionRepository } from "../../contract/repository/transaction-repository";
import { UseCase } from "../../contract/use-case";

export class DeleteTransactionUseCase implements UseCase<Input, Output> {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(input: Input): Promise<void> {
    const transaction = await this.transactionRepository.getById(input.id);
    if (transaction.getUserId() !== input.user.id) {
      throw new ForbiddenError(
        "O usuário não possui permissão para excluir esta transação."
      );
    }
    await this.transactionRepository.delete(transaction);
  }
}

type Input = {
  id: string;
  user: LoggedUserDTO;
};

type Output = void;
