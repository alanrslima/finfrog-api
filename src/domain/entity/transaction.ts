import { Id } from "../value-object/id";
import { Value } from "../value-object/value";

type CreateProps = {
  name: string;
  date: string;
  value: number;
  accountId: string;
  userId: string;
  categoryId?: string;
  notes?: string;
};

type BuildProps = CreateProps & {
  id: string;
};

export class Transaction {
  private id: string;
  private name: string;
  private value: Value;
  private date: Date;
  private categoryId?: string;
  private accountId: string;
  private notes?: string;
  private userId: string;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = props.name;
    this.value = new Value(props.value);
    this.date = new Date(props.date);
    this.categoryId = props.categoryId;
    this.notes = props.notes;
    this.accountId = props.accountId;
    this.userId = props.userId;
  }

  static create(props: CreateProps) {
    return new Transaction({ ...props, id: new Id().getValue() });
  }

  static build(props: BuildProps) {
    return new Transaction(props);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getValue() {
    return this.value.getValue();
  }

  setValue(value: number) {
    this.value = new Value(value);
  }

  getDate() {
    return this.date;
  }

  setDate(date: string) {
    return (this.date = new Date(date));
  }

  getCategoryId() {
    return this.categoryId;
  }

  setCategoryId(categoryId?: string) {
    this.categoryId = categoryId;
  }

  getAccountId() {
    return this.accountId;
  }

  setAccountId(accountId: string) {
    this.accountId = accountId;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes?: string) {
    this.notes = notes;
  }
}
