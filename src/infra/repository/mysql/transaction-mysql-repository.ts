import { TransactionRepository } from "../../../application/contract/repository/transaction-repository";
import { Transaction } from "../../../domain/entity/transaction";
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
}
