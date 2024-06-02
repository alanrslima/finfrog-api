import { BaseError } from "./base-error";

export class UserAlreadyExistsError extends BaseError {
  statusCode = 400;

  constructor() {
    super("User already exists");
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }

  serialize(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: "Usuário já existe no sistema!",
      },
    ];
  }
}
