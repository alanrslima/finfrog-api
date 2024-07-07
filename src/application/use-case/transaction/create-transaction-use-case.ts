import { Transaction } from "../../../domain/entity/transaction";
import { ForbiddenError } from "../../../error/forbidden-error";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { AccountRepository } from "../../contract/repository/account-repository";
import { CategoryRepository } from "../../contract/repository/category-repository";
import { TransactionRepository } from "../../contract/repository/transaction-repository";
import { UseCase } from "../../contract/use-case";

export class CreateTransactionUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const account = await this.accountRepository.getById(input.accountId);
    if (account.getUserId() !== input.user.id) {
      throw new ForbiddenError(
        "O usuário não possui permissão para incluir esta conta em uma transação."
      );
    }
    if (input.categoryId) {
      const category = await this.categoryRepository.getById(input.categoryId);
      if (category.getUserId() !== input.user.id) {
        throw new ForbiddenError(
          "O usuário não possui permissão para incluir esta categoria em uma transação."
        );
      }
    }
    const transaction = Transaction.create({
      date: input.date,
      name: input.name,
      value: input.value,
      categoryId: input.categoryId,
      notes: input.notes,
      accountId: account.getId(),
      userId: input.user.id,
    });
    await this.transactionRepository.create(transaction);
  }
}

type Input = {
  name: string;
  value: number;
  date: string;
  accountId: string;
  categoryId?: string;
  notes?: string;
  user: LoggedUserDTO;
};

type Output = void;
