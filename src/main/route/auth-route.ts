import { type Router } from "express";
import { adaptRoute } from "../adapter/express-route-adapter";
import { signUpControllerFactory } from "../factory/controller/auth/sign-up-controller-factory";
import { signInControllerFactory } from "../factory/controller/auth/sign-in-controller-factory";
import { meControllerFactory } from "../factory/controller/auth/me-controller-factory";
import { auth } from "../middleware/auth";
import { logOutControllerFactory } from "../factory/controller/auth/log-out-controller-factory";

export default (router: Router): void => {
  router.post("/auth/sign-up", adaptRoute(signUpControllerFactory()));
  router.post("/auth/sign-in", adaptRoute(signInControllerFactory()));
  router.get("/auth/me", auth, adaptRoute(meControllerFactory()));
  router.post("/auth/log-out", auth, adaptRoute(logOutControllerFactory()));
};
