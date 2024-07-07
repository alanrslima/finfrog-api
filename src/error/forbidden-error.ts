import { BaseError, BaseErrorSerializeProps } from "./base-error";

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor(private readonly text: string) {
    super("Forbidden");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serialize(): BaseErrorSerializeProps {
    return [
      {
        description:
          "O usuário não possui permissão para acessar este recurso ou executar esta ação",
        message: this.text,
      },
    ];
  }
}
