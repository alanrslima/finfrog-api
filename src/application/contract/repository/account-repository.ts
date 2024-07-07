import { Account } from "../../../domain/entity/account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  getById(id: string): Promise<Account>;
}
