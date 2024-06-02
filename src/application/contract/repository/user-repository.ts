import { User } from "../../../domain/entity/user";

export interface UserRepository {
  getByEmail(email: string): Promise<User | undefined>;
  create(user: User): Promise<void>;
}
