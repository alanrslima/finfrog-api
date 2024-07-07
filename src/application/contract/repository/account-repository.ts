import { Account } from "../../../domain/entity/account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  update(account: Account): Promise<void>;
  delete(account: Account): Promise<void>;
  getById(id: string): Promise<Account>;
}
