import { Id } from "../value-object/id";
import { Name } from "../value-object/name";

type CreateProps = {
  name: string;
  userId: string;
};

type BuildProps = CreateProps & {
  id: string;
};

export class Category {
  private id: string;
  private name: Name;
  private userId: string;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = new Name(props.name);
    this.userId = props.userId;
  }

  static create(props: CreateProps) {
    return new Category({ ...props, id: new Id().getValue() });
  }

  static build(props: BuildProps) {
    return new Category(props);
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
}
