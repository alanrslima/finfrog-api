import { TransactionRepository } from "../../../application/contract/repository/transaction-repository";
import { Transaction } from "../../../domain/entity/transaction";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";

export class TransactionMemoryRepository implements TransactionRepository {
  private data: Transaction[];

  constructor(mock?: Transaction[]) {
    this.data = mock || [];
  }

  async create(account: Transaction): Promise<void> {
    this.data.push(account);
  }

  async getById(id: string): Promise<Transaction> {
    const transaction = this.data.find(
      (transaction) => transaction.getId() === id
    );
    if (!transaction) {
      throw new ResourceNotFoundError();
    }
    return transaction;
  }

  async delete(transaction: Transaction): Promise<void> {
    this.data = this.data.filter(
      (item) => item.getId() !== transaction.getId()
    );
  }

  getData() {
    return this.data;
  }
}
