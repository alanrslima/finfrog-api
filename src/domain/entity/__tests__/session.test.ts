import { InvalidCredentialsError } from "../../../error/invalid-credentials-error";
import { Session } from "../session";
import { User } from "../user";

it("should create a session using password", () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
    rawPassword: "12345678",
  });
  const session = Session.createWithPassword({ rawPassword: "12345678", user });
  expect(session.getToken()).toBeDefined();
});

it("should not create a session using password if the password is wrong", () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
    rawPassword: "12345678",
  });
  const session = () =>
    Session.createWithPassword({ rawPassword: "wrongpassword", user });
  expect(session).toThrow(InvalidCredentialsError);
});

it("should create a session without a password for oauth signin", () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
  });
  const session = Session.createWithoutPassword({ user });
  expect(session.getToken()).toBeDefined();
});
