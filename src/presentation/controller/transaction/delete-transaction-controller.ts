import { DeleteTransactionUseCase } from "../../../application/use-case/transaction/delete-transaction-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { noContent } from "../../helpers/http-helper";

export class DeleteTransactionController implements Controller {
  constructor(
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    await this.deleteTransactionUseCase.execute(params);
    return noContent();
  }
}
