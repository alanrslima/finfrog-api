import { Transaction } from "../../../domain/entity/transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  getById(id: string): Promise<Transaction>;
  delete(transaction: Transaction): Promise<void>;
}
