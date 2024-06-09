import jwt from "jsonwebtoken";
import { UserRepository } from "../../application/contract/repository/user-repository";
import { NotAuthorizedError } from "../../error/not-authorized-error";
import { env } from "../../main/config/env";
import { HttpResponse } from "../contract/http-response";
import { Middleware } from "../contract/middleware";
import { ok } from "../helpers/http-helper";
import { SessionRepository } from "../../application/contract/repository/session-repository";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository
  ) {}

  private decrypt(ciphertext: string): string {
    const plaintext: any = jwt.verify(ciphertext, env.jwtSecret);
    return plaintext;
  }

  private decode(plaintext: string): string {
    const decoded = jwt.decode(plaintext);
    if (decoded === null) {
      throw new Error("Falha de decodificação");
    }
    if (typeof decoded === "string") {
      return decoded;
    }
    return decoded?.sub ?? "";
  }

  async handle(
    request: AuthMiddlewareRequest
  ): Promise<HttpResponse<AuthMiddlewareResponse>> {
    this.sessionRepository.deleteExpired();
    const { authorization } = request;
    if (authorization === undefined) {
      throw new NotAuthorizedError();
    }
    try {
      const [, token] = authorization.split(" ");
      this.decrypt(token);
      const userId = this.decode(token);
      const user = await this.userRepository.getById(userId);
      const session = await this.sessionRepository.getByToken(token);
      return ok({
        user: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          role: user.getRole(),
          permissions: user.getPermissions(),
        },
        session: {
          id: session.getId(),
        },
      });
    } catch (error) {
      throw new NotAuthorizedError();
    }
  }
}

export type AuthMiddlewareRequest = {
  authorization?: string;
};

export type AuthMiddlewareResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
  session: {
    id: string;
  };
};
