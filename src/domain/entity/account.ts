import { Id } from "../value-object/id";
import { Name } from "../value-object/name";

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
  private initialValue: number;
  private userId: string;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = new Name(props.name);
    this.initialValue = props.initialValue || 0;
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

  getName() {
    return this.name.getValue();
  }

  getUserId() {
    return this.userId;
  }

  getInitialValue() {
    return this.initialValue;
  }
}
