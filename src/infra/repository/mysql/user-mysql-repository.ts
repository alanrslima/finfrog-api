import { UserRepository } from "../../../application/contract/repository/user-repository";
import { User } from "../../../domain/entity/user";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class UserMysqlRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const sql = `INSERT INTO user (id, name, email, password, salt, role) VALUES (?,?,?,?,?,?)`;
    await mysqlDatabase.query({
      sql,
      values: [
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getPassword()?.getHash(),
        user.getPassword()?.getSalt(),
        user.getRole(),
      ],
    });
  }

  async getById(id: string): Promise<User> {
    const sql = `SELECT id, name, email, password, role, salt FROM user WHERE id = ?`;
    const response = await mysqlDatabase.query({ sql, values: [id] });
    if (!response.length) {
      throw new ResourceNotFoundError();
    }
    const [data] = response;
    return User.build({
      email: data.email,
      id: data.id,
      name: data.name,
      password: data.password,
      salt: data.salt,
      role: data.role,
    });
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const sql = `SELECT id, name, email, password, role, salt FROM user WHERE email = ?`;
    const response = await mysqlDatabase.query({ sql, values: [email] });
    if (response.length) {
      const [data] = response;
      return User.build({
        email: data.email,
        id: data.id,
        name: data.name,
        password: data.password,
        salt: data.salt,
        role: data.role,
      });
    }
    return undefined;
  }
}
