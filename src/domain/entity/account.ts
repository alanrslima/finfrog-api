import { Id } from "../value-object/id";
import { Name } from "../value-object/name";
import { Value } from "../value-object/value";

type CreateProps = {
  name: string;
  initialValue?: number;
  userId: string;
};

type BuildProps = CreateProps & {
  id: string;
};

export class Account {
  private id: string;
  private name: Name;
  private initialValue: Value;
  private userId: string;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = new Name(props.name);
    this.initialValue = new Value(props.initialValue || 0);
    this.userId = props.userId;
  }

  static create(props: CreateProps) {
    return new Account({ ...props, id: new Id().getValue() });
  }

  static build(props: BuildProps) {
    return new Account(props);
  }

  getId() {
    return this.id;
  }

  getName(): string {
    return this.name.getValue();
  }

  setName(name: string): void {
    this.name = new Name(name);
  }

  getUserId(): string {
    return this.userId;
  }

  getInitialValue(): number {
    return this.initialValue.getValue();
  }

  setInitialValue(initialValue: number) {
    this.initialValue = new Value(initialValue);
  }
}
