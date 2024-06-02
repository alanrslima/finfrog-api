import crypto from "node:crypto";
import { InvalidAttributeError } from "../../error/invalid-attribute-error";

export class Password {
  private hash: string;
  private salt: string;

  private constructor(values: { hash: string; salt: string }) {
    this.hash = values.hash;
    this.salt = values.salt;
  }

  static create(values: { rawPassword: string }) {
    Password.checkPolicy(values.rawPassword);
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = Password.generateHash({
      rawPassword: values.rawPassword,
      salt,
    });
    return new Password({ hash, salt });
  }

  static build(values: { hash: string; salt: string }) {
    return new Password({ hash: values.hash, salt: values.salt });
  }

  getHash() {
    return this.hash;
  }

  getSalt() {
    return this.salt;
  }

  private static generateHash(values: { rawPassword: string; salt: string }) {
    return crypto
      .pbkdf2Sync(values.rawPassword, values.salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }

  private static checkPolicy(rawPassword: string) {
    if (rawPassword.length < 6) {
      throw new InvalidAttributeError(
        "Password",
        "A senha deve possuir pelo menos 6 dígitos"
      );
    }
  }

  public valid(password: string) {
    const hash = Password.generateHash({
      rawPassword: password,
      salt: this.salt,
    });
    return this.hash === hash;
  }
}
