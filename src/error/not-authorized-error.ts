import { BaseError } from "./base-error";

export class NotAuthorizedError extends BaseError {
  statusCode = 401;

  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize(): { message: string; field?: string | undefined }[] {
    return [{ message: "Não autorizado" }];
  }
}
