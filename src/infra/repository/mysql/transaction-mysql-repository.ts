import { TransactionRepository } from "../../../application/contract/repository/transaction-repository";
import { Transaction } from "../../../domain/entity/transaction";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class TransactionMysqlRepository implements TransactionRepository {
  async create(transaction: Transaction): Promise<void> {
    const sql = `INSERT INTO transaction (id, name, value, date, notes, user_id, account_id, category_id) VALUES (?,?,?,?,?,?,?,?)`;
    await mysqlDatabase.query({
      sql,
      values: [
        transaction.getId(),
        transaction.getName(),
        transaction.getValue(),
        transaction.getDate(),
        transaction.getNotes(),
        transaction.getUserId(),
        transaction.getAccountId(),
        transaction.getCategoryId(),
      ],
    });
  }

  async delete(transaction: Transaction): Promise<void> {
    const sql = `DELETE FROM transaction WHERE id = ?`;
    await mysqlDatabase.query({ sql, values: [transaction.getId()] });
  }

  async getById(id: string): Promise<Transaction> {
    const sql = `SELECT id, name, value, date, notes, user_id, account_id, category_id FROM transaction WHERE id = ?`;
    const [data] = await mysqlDatabase.query({ sql, values: [id] });
    if (!data) throw new ResourceNotFoundError();
    return Transaction.build({
      accountId: data.account_id,
      date: data.date,
      id: data.id,
      name: data.name,
      userId: data.user_id,
      value: data.value,
      categoryId: data.category_id,
      notes: data.notes,
    });
  }
}
