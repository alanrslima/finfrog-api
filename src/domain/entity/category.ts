import { Id } from "../value-object/id";

type CreateProps = {
  name: string;
  userId: string;
};

type BuildProps = CreateProps & {
  id: string;
};

export class Category {
  private id: string;
  private name: string;
  private userId: string;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = props.name;
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
    return this.name;
  }

  getUserId() {
    return this.userId;
  }

  setName(name: string) {
    this.name = name;
  }
}
