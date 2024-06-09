import { Controller } from "../../../../presentation/contract/controller";
import { MeController } from "../../../../presentation/controller/auth/me-controller";

export const meControllerFactory = (): Controller => {
  const controller = new MeController();
  return controller;
};
