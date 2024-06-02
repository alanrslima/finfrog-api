export type BaseErrorSerializeProps = {
  message: string;
  field?: string;
  description?: string;
  context?: any;
}[];

export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract statusCode: number;
  abstract serialize(): BaseErrorSerializeProps;
}
