import { BaseError } from "./base-error";

export class ResourceNotFoundError extends BaseError {
  statusCode = 400;

  constructor() {
    super("Resource not found");
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }

  serialize(): { message: string; field?: string | undefined }[] {
    return [{ message: "Recurso não encontrado!" }];
  }
}
