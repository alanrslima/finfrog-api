import { UserRepository } from "../../../application/contract/repository/user-repository";
import { User } from "../../../domain/entity/user";

export class UserMemoryRepository implements UserRepository {
  private data: User[];

  constructor(mock?: User[]) {
    this.data = mock || [];
  }

  async create(user: User): Promise<void> {
    this.data.push(user);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.data.find((user) => user.getEmail() === email);
  }
}
