import { LoggedUserDTO } from "../../../application/contract/dto/logged-user-dto";
import { TransactionQuery } from "../../../application/contract/query/transaction-query";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class ListTransactionsController implements Controller {
  constructor(private readonly transactionQuery: TransactionQuery) {}

  async handle(params: Params): Promise<HttpResponse<any>> {
    const response = await this.transactionQuery.list({
      ...params,
      userId: params.user.id,
    });
    return ok(response);
  }
}

type Params = {
  user: LoggedUserDTO;
};
