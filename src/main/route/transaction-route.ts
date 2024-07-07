import { type Router } from "express";
import { adaptRoute } from "../adapter/express-route-adapter";
import { auth } from "../middleware/auth";
import { createTransactionControllerFactory } from "../factory/controller/transaction/create-transaction-controller-factory";
import { listTransactionsControllerFactory } from "../factory/controller/transaction/list-transactions-controller-factory";

export default (router: Router): void => {
  router.post(
    "/transaction",
    auth,
    adaptRoute(createTransactionControllerFactory())
  );
  router.get(
    "/transaction",
    auth,
    adaptRoute(listTransactionsControllerFactory())
  );
};
