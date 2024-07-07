import { DeleteAccountUseCase } from "../../../application/use-case/account/delete-account-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { noContent } from "../../helpers/http-helper";

export class DeleteAccountController implements Controller {
  constructor(private readonly deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    await this.deleteAccountUseCase.execute(params);
    return noContent();
  }
}
