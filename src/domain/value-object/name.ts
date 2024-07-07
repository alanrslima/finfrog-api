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
    if (typeof value !== "string" || !value?.trim()?.length) {
      return false;
    }
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(String(value));
  }

  getValue() {
    return this.value;
  }
}
