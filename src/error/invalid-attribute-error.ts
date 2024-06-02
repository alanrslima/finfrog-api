import { BaseError, BaseErrorSerializeProps } from "./base-error";

export class InvalidAttributeError extends BaseError {
  statusCode = 400;

  constructor(
    private readonly attributeName: string,
    private readonly description?: string
  ) {
    super("Invalid attribute");
    Object.setPrototypeOf(this, InvalidAttributeError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        message: "Atributo inválido",
        description: this.description,
        field: this.attributeName,
      },
    ];
  }
}
