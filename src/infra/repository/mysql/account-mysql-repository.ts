import { AccountRepository } from "../../../application/contract/repository/account-repository";
import { Account } from "../../../domain/entity/account";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class AccountMysqlRepository implements AccountRepository {
  async create(account: Account): Promise<void> {
    const sql = `INSERT INTO account (id, name, initial_value, user_id) VALUES (?,?,?,?)`;
    await mysqlDatabase.query({
      sql,
      values: [
        account.getId(),
        account.getName(),
        account.getInitialValue(),
        account.getUserId(),
      ],
    });
  }

  async getById(id: string): Promise<Account> {
    const sql = `SELECT id, name, initial_value as initialValue, user_id as userId FROM account WHERE id = ?`;
    const [data] = await mysqlDatabase.query({
      sql,
      values: [id],
    });
    if (!data) throw new ResourceNotFoundError();
    return Account.build(data);
  }
}
