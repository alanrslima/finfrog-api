import { Email } from "../value-object/email";
import { Id } from "../value-object/id";
import { Name } from "../value-object/name";
import { Password } from "../value-object/password";

type CreateProps = {
  name: string;
  email: string;
  rawPassword?: string;
};

type BuildProps = Omit<CreateProps, "rawPassword"> & {
  id: string;
  password?: string;
  salt?: string;
};

type ConstructorProps = Omit<BuildProps, "password" | "salt"> & {
  password?: Password;
};

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password?: Password;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = new Name(props.name).getValue();
    this.email = new Email(props.email).getValue();
    this.password = props.password;
  }

  static create(props: CreateProps) {
    return new User({
      ...props,
      id: new Id().getValue(),
      password: props.rawPassword
        ? Password.create({ rawPassword: props.rawPassword })
        : undefined,
    });
  }

  static build(props: BuildProps) {
    return new User({
      ...props,
      id: new Id().getValue(),
      password:
        props.password && props.salt
          ? Password.build({ hash: props.password, salt: props.salt })
          : undefined,
    });
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}
