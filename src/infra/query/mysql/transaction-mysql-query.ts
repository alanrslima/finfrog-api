import {
  TransactionQuery,
  ListTransactionInput,
  ListTransactionOutput,
} from "../../../application/contract/query/transaction-query";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class TransactionMysqlQuery implements TransactionQuery {
  async list(input: ListTransactionInput): Promise<ListTransactionOutput> {
    const [count] = await mysqlDatabase.query({
      sql: `SELECT COUNT(*) AS total FROM transaction WHERE user_id = ?`,
      values: [input.userId],
    });
    const sql = `SELECT  
    a.id,
    a.name,
    a.value,
    a.date,
    a.notes,
    a.created_at,
    b.id as account_id,
    b.name as account_name,
    c.id as category_id,
    c.name as category_name
    FROM transaction as a 
    INNER JOIN account as b ON a.account_id = b.id
    LEFT JOIN category as c ON a.category_id = c.id
    WHERE a.user_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?`;
    const limit = 100;
    const offset = (input?.page || 0) * limit;
    const response = await mysqlDatabase.query({
      sql,
      values: [input.userId, limit, offset],
    });
    const data = response?.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      date: item.date,
      account: {
        id: item.account_id,
        name: item.account_name,
      },
      category: item.category_id && {
        id: item.category_id,
        name: item.category_name,
      },
      createdAt: item.created_at,
    }));
    return { pages: Math.ceil(count.total / limit), data };
  }
}
