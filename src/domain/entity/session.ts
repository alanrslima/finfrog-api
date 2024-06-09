import { InvalidCredentialsError } from "../../error/invalid-credentials-error";
import { env } from "../../main/config/env";
import { Id } from "../value-object/id";
import { User } from "./user";
import jwt from "jsonwebtoken";

type CreateProps = {
  token: string;
  userId: string;
  expiresAt: Date;
};

type BuildProps = CreateProps & {
  id: string;
};

type CreateWithoutPasswordProps = {
  user: User;
};

type CreateWithPasswordProps = CreateWithoutPasswordProps & {
  rawPassword: string;
};

const EXPIRES_IN_SECONDS = 60 * 60 * 24; // 1 dia

export class Session {
  private id: string;
  private token: string;
  private userId: string;
  private expiresAt: Date;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.token = props.token;
    this.expiresAt = props.expiresAt;
    this.userId = props.userId;
  }

  static createWithoutPassword(props: CreateWithoutPasswordProps) {
    return new Session({
      expiresAt: this.generateExpiresAt(),
      token: this.createToken(props.user.getId()),
      id: new Id().getValue(),
      userId: props.user.getId(),
    });
  }

  static createWithPassword(props: CreateWithPasswordProps) {
    const isValid = props.user.getPassword()?.valid(props.rawPassword);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }
    return new Session({
      expiresAt: this.generateExpiresAt(),
      token: this.createToken(props.user.getId()),
      id: new Id().getValue(),
      userId: props.user.getId(),
    });
  }

  static build(props: BuildProps) {
    return new Session(props);
  }

  private static generateExpiresAt() {
    return new Date(new Date().getTime() + EXPIRES_IN_SECONDS * 1000);
  }

  private static createToken(plaintext: string): string {
    const ciphertext = jwt.sign({}, env.jwtSecret, {
      subject: plaintext,
      expiresIn: EXPIRES_IN_SECONDS,
    });
    return ciphertext;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getId() {
    return this.id;
  }

  getExpiresAt() {
    return this.expiresAt;
  }
}
