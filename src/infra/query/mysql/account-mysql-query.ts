import {
  AccountQuery,
  ListAccountOutput,
  ListAccountInput,
} from "../../../application/contract/query/account-query";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class AccountMysqlQuery implements AccountQuery {
  async list(input: ListAccountInput): Promise<ListAccountOutput> {
    const sql = `SELECT id, name, initial_value as initialValue FROM account WHERE user_id = ?`;
    return await mysqlDatabase.query({
      sql,
      values: [input.userId],
    });
  }
}
