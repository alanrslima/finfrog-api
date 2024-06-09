import { SessionRepository } from "../../../application/contract/repository/session-repository";
import { Session } from "../../../domain/entity/session";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class SessionMysqlRepository implements SessionRepository {
  async create(session: Session): Promise<void> {
    const sql = `INSERT INTO session (id, user_id, token, expires_at) VALUES (?,?,?,?)`;
    await mysqlDatabase.query({
      sql,
      values: [
        session.getId(),
        session.getUserId(),
        session.getToken(),
        session.getExpiresAt(),
      ],
    });
  }

  async deleteExpired(): Promise<void> {
    const sql = `DELETE FROM session WHERE expires_at < ?`;
    await mysqlDatabase.query({ sql, values: [new Date()] });
  }

  async getByToken(token: string): Promise<Session> {
    const sql = `SELECT id, user_id, token, expires_at FROM session WHERE token = ?`;
    const response = await mysqlDatabase.query({
      sql,
      values: [token],
    });
    if (!response.length) {
      throw new ResourceNotFoundError();
    }
    const [data] = response;
    return Session.build({
      id: data.id,
      expiresAt: new Date(data.expires_at),
      token: data.token,
      userId: data.user_id,
    });
  }
}
