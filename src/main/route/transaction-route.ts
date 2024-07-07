import { type Router } from "express";
import { adaptRoute } from "../adapter/express-route-adapter";
import { auth } from "../middleware/auth";
import { createTransactionControllerFactory } from "../factory/controller/transaction/create-transaction-controller-factory";
import { listTransactionsControllerFactory } from "../factory/controller/transaction/list-transactions-controller-factory";
import { deleteTransactionControllerFactory } from "../factory/controller/transaction/delete-transaction-controller-factory";
import { updateTransactionControllerFactory } from "../factory/controller/transaction/update-transaction-controller-factory";

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
  router.delete(
    "/transaction",
    auth,
    adaptRoute(deleteTransactionControllerFactory())
  );
  router.put(
    "/transaction",
    auth,
    adaptRoute(updateTransactionControllerFactory())
  );
};
