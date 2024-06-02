import { InvalidAttributeError } from "../../error/invalid-attribute-error";

export class Email {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidAttributeError("Email");
    }
    this.value = value;
  }

  private isValid(value: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(String(value));
  }

  getValue() {
    return this.value;
  }
}
