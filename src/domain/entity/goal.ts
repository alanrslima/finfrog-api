import { Id } from "../value-object/id";

type CreateProps = {
  name: string;
  targetValue: number;
  initialValue: number;
  targetDate: string;
  userId: string;
};

type BuildProps = CreateProps & {
  id: string;
};

export class Goal {
  private id: string;
  private name: string;
  private targetValue: number;
  private initialValue: number;
  private targetDate: Date;
  private userId: string;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = props.name;
    this.targetDate = new Date(props.targetDate);
    this.targetValue = props.targetValue;
    this.userId = props.userId;
    this.initialValue = props.initialValue;
  }

  static create(props: CreateProps) {
    return new Goal({ ...props, id: new Id().getValue() });
  }

  static build(props: BuildProps) {
    return new Goal(props);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getTargetValue(): number {
    return this.targetValue;
  }

  getInitialValue(): number {
    return this.initialValue;
  }

  getTargetDate(): Date {
    return this.targetDate;
  }

  getUserId(): string {
    return this.userId;
  }
}
