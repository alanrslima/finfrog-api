import { TransactionRepository } from "../../../application/contract/repository/transaction-repository";
import { Transaction } from "../../../domain/entity/transaction";

export class TransactionMemoryRepository implements TransactionRepository {
  private data: Transaction[];

  constructor(mock?: Transaction[]) {
    this.data = mock || [];
  }

  async create(account: Transaction): Promise<void> {
    this.data.push(account);
  }

  getData() {
    return this.data;
  }
}
