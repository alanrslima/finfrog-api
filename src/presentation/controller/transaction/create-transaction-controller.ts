import { CreateTransactionUseCase } from "../../../application/use-case/transaction/create-transaction-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { created } from "../../helpers/http-helper";

export class CreateTransactionController implements Controller {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase
  ) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.createTransactionUseCase.execute(params);
    return created(response);
  }
}
