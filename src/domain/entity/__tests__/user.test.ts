import { User } from "../user";

it("should create am user", () => {
  const user = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
    rawPassword: "12345678",
  });
  expect(user.getId()).toBeDefined();
  expect(user.getName()).toEqual("John Doe");
  expect(user.getEmail()).toEqual("johndoe@email.com");
  expect(user.getPassword()?.getHash()).toBeDefined();
  expect(user.getPassword()?.getSalt()).toBeDefined();
  expect(user.getRole()).toEqual("admin");
});

it("should build am user", () => {
  const createdUser = User.create({
    email: "johndoe@email.com",
    name: "John Doe",
    role: "admin",
    rawPassword: "12345678",
  });

  const user = User.build({
    email: createdUser.getEmail(),
    name: createdUser.getName(),
    role: createdUser.getRole(),
    id: createdUser.getId(),
    password: createdUser.getPassword()?.getHash(),
    salt: createdUser.getPassword()?.getSalt(),
  });
  expect(user.getId()).toBeDefined();
  expect(user.getName()).toEqual("John Doe");
  expect(user.getEmail()).toEqual("johndoe@email.com");
  expect(user.getPassword()?.getHash()).toBeDefined();
  expect(user.getPassword()?.getSalt()).toBeDefined();
  expect(user.getRole()).toEqual("admin");
});
