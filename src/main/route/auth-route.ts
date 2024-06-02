import { type Router } from "express";
import { adaptRoute } from "../adapter/express-route-adapter";
import { signUpControllerFactory } from "../factory/controller/sign-up-controller-factory";

export default (router: Router): void => {
  router.post("/auth/sign-up", adaptRoute(signUpControllerFactory()));
};
