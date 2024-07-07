import { UpdateAccountUseCase } from "../../../application/use-case/account/update-account-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class UpdateAccountController implements Controller {
  constructor(private readonly updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.updateAccountUseCase.execute(params);
    return ok(response);
  }
}
