import { AccountRepository } from "../../../application/contract/repository/account-repository";
import { Account } from "../../../domain/entity/account";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";

export class AccountMemoryRepository implements AccountRepository {
  private data: Account[];

  constructor(mock?: Account[]) {
    this.data = mock || [];
  }

  async create(account: Account): Promise<void> {
    this.data.push(account);
  }

  async getById(id: string): Promise<Account> {
    const account = this.data.find((account) => account.getId() === id);
    if (!account) throw new ResourceNotFoundError();
    return account;
  }

  getData() {
    return this.data;
  }
}
