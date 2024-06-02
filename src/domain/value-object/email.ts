import { InvalidParameterError } from "../../error/invalid-parameter-error";

export class Email {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidParameterError("Email");
    }
    this.value = value;
  }

  private isValid(value: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(String(value));
  }

  getValue() {
    return this.value;
  }
}
