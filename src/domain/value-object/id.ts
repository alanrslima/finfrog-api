import { randomUUID } from "node:crypto";

export class Id {
  private value: string;

  constructor() {
    this.value = randomUUID();
  }

  getValue() {
    return this.value;
  }
}
