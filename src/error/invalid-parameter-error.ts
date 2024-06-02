import { BaseError } from "./base-error";

export class InvalidParameterError extends BaseError {
  statusCode = 400;

  constructor(private readonly parameterName: string) {
    super("Invalid parameter");
    Object.setPrototypeOf(this, InvalidParameterError.prototype);
  }

  serialize(): { message: string; field?: string | undefined }[] {
    return [{ message: `Parâmetro inválido: ${this.parameterName}` }];
  }
}
