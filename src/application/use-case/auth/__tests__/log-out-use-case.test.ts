import { Session } from "../../../../domain/entity/session";
import { User } from "../../../../domain/entity/user";
import { SessionMemoryRepository } from "../../../../infra/repository/memory/session-memory-repository";
import { LogOutUseCase } from "../log-out-use-case";

it("should not log out if the session does not exists", async () => {
  const user = User.create({
    email: "johndoe@gmail.com",
    name: "John Doe",
    role: "admin",
    rawPassword: "12345678",
  });
  const tempSession = Session.createWithPassword({
    rawPassword: "12345678",
    user,
  });
  const sessionMemoryRepository = new SessionMemoryRepository([tempSession]);
  const logOutUseCase = new LogOutUseCase(sessionMemoryRepository);
  await logOutUseCase.execute({ session: { id: "123" } });
  expect(sessionMemoryRepository.getData()).toHaveLength(1);
});

it("should log out if the session exists", async () => {
  const user = User.create({
    email: "johndoe@gmail.com",
    name: "John Doe",
    role: "admin",
    rawPassword: "12345678",
  });
  const tempSession = Session.createWithPassword({
    rawPassword: "12345678",
    user,
  });
  const sessionMemoryRepository = new SessionMemoryRepository([tempSession]);
  const logOutUseCase = new LogOutUseCase(sessionMemoryRepository);
  await logOutUseCase.execute({ session: { id: tempSession.getId() } });
  expect(sessionMemoryRepository.getData()).toHaveLength(0);
});
