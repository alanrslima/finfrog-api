import { UpdateTransactionUseCase } from "../../../application/use-case/transaction/update-transaction-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class UpdateTransactionController implements Controller {
  constructor(
    private readonly updateTransactionUseCase: UpdateTransactionUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.updateTransactionUseCase.execute(params);
    return ok(response);
  }
}
