import { Email } from "../value-object/email";
import { Id } from "../value-object/id";
import { Name } from "../value-object/name";
import { Password } from "../value-object/password";
import { Role } from "./role";
import { availableRoles } from "../contract/available-roles";

type CreateProps<> = {
  name: string;
  email: string;
  rawPassword?: string;
  role: keyof typeof availableRoles;
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
  private name: Name;
  private email: Email;
  private password?: Password;
  private role: Role;

  private constructor(props: ConstructorProps) {
    this.id = props.id;
    this.name = new Name(props.name);
    this.email = new Email(props.email);
    this.password = props.password;
    this.role = new Role({ name: props.role });
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
      password:
        props.password && props.salt
          ? Password.build({ hash: props.password, salt: props.salt })
          : undefined,
    });
  }

  getName(): string {
    return this.name.getValue();
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role.getName();
  }

  getPermissions() {
    return this.role.getPermissions();
  }
}
