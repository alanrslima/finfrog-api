import { InvalidAttributeError } from "../../error/invalid-attribute-error";

export class Value {
  private value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new InvalidAttributeError("O valor informado não é válido");
    }
    this.value = value;
  }

  isValid(value: any): boolean {
    return typeof value === "number" && !isNaN(value) && isFinite(value);
  }

  getValue() {
    return this.value;
  }
}
