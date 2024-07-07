import { ForbiddenError } from "../../../error/forbidden-error";
import { LoggedUserDTO } from "../../contract/dto/logged-user-dto";
import { AccountRepository } from "../../contract/repository/account-repository";
import { CategoryRepository } from "../../contract/repository/category-repository";
import { TransactionRepository } from "../../contract/repository/transaction-repository";
import { UseCase } from "../../contract/use-case";

export class UpdateTransactionUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const account = await this.accountRepository.getById(input.accountId);
    if (account.getUserId() !== input.user.id) {
      throw new ForbiddenError(
        "O usuário não possui permissão para incluir está conta na transação."
      );
    }
    if (input.categoryId) {
      const category = await this.categoryRepository.getById(input.categoryId);
      if (category.getUserId() !== input.user.id) {
        throw new ForbiddenError(
          "O usuário não possui permissão para incluir esta categoria na transação."
        );
      }
    }
    const transaction = await this.transactionRepository.getById(input.id);
    if (transaction.getUserId() !== input.user.id) {
      throw new ForbiddenError(
        "O usuário não possui permissão para atualizar esta transação."
      );
    }
    transaction.setAccountId(input.accountId);
    transaction.setCategoryId(input.categoryId);
    transaction.setName(input.name);
    transaction.setNotes(input.notes);
    transaction.setDate(input.date);
    transaction.setValue(input.value);
    await this.transactionRepository.update(transaction);
  }
}

type Input = {
  id: string;
  name: string;
  value: number;
  date: string;
  accountId: string;
  categoryId?: string;
  notes?: string;
  user: LoggedUserDTO;
};

type Output = void;
