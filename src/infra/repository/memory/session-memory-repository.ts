import { SessionRepository } from "../../../application/contract/repository/session-repository";
import { Session } from "../../../domain/entity/session";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";

export class SessionMemoryRepository implements SessionRepository {
  private data: Session[];

  constructor(mock?: Session[]) {
    this.data = mock || [];
  }

  async create(session: Session): Promise<void> {
    this.data.push(session);
  }

  getData() {
    return this.data;
  }

  async deleteExpired(): Promise<void> {
    this.data.filter((item) => item.getExpiresAt() <= new Date());
  }

  async getByToken(token: string): Promise<Session> {
    const session = this.data.find((item) => item.getToken() === token);
    if (!session) {
      throw new ResourceNotFoundError();
    }
    return session;
  }
}
