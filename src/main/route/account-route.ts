import { type Router } from "express";
import { adaptRoute } from "../adapter/express-route-adapter";
import { createAccountControllerFactory } from "../factory/controller/account/create-account-controller-factory";
import { auth } from "../middleware/auth";
import { listAccountsControllerFactory } from "../factory/controller/account/list-accounts-controller-factory";
import { deleteAccountControllerFactory } from "../factory/controller/account/delete-account-controller-factory";

export default (router: Router): void => {
  router.post("/account", auth, adaptRoute(createAccountControllerFactory()));
  router.get("/account", auth, adaptRoute(listAccountsControllerFactory()));
  router.delete("/account", auth, adaptRoute(deleteAccountControllerFactory()));
};
