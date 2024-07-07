import { CreateAccountUseCase } from "../../../application/use-case/account/create-account-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { created } from "../../helpers/http-helper";

export class CreateAccountController implements Controller {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.createAccountUseCase.execute(params);
    return created(response);
  }
}
