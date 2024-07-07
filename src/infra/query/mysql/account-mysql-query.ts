import {
  AccountQuery,
  ListAccountOutput,
  ListAccountInput,
} from "../../../application/contract/query/account-query";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class AccountMysqlQuery implements AccountQuery {
  async list(input: ListAccountInput): Promise<ListAccountOutput> {
    const [count] = await mysqlDatabase.query({
      sql: `SELECT COUNT(*) AS total FROM account WHERE user_id = ?`,
      values: [input.userId],
    });
    const sql = `SELECT id, name, initial_value as initialValue FROM account WHERE user_id = ?`;
    const data = await mysqlDatabase.query({
      sql,
      values: [input.userId],
    });
    return { pages: count.total, data };
  }
}
