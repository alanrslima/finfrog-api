import { InvalidAttributeError } from "../../error/invalid-attribute-error";

export class Name {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidAttributeError("Name");
    }
    this.value = value;
  }

  private isValid(value: string) {
    var regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(String(value));
  }

  getValue() {
    return this.value;
  }
}
