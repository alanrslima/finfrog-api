import { LoggedUserDTO } from "../../../application/contract/dto/logged-user-dto";
import { AccountQuery } from "../../../application/contract/query/account-query";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class ListAccountsController implements Controller {
  constructor(private readonly accountQuery: AccountQuery) {}

  async handle(params: ParamsProps): Promise<HttpResponse<any>> {
    const response = await this.accountQuery.list({ userId: params.user.id });
    return ok(response);
  }
}

type ParamsProps = {
  user: LoggedUserDTO;
};
