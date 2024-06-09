import { LogOutUseCase } from "../../../application/use-case/auth/log-out-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { noContent } from "../../helpers/http-helper";

export class LogOutController implements Controller {
  constructor(private readonly logOutUseCase: LogOutUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    await this.logOutUseCase.execute(params);
    return noContent();
  }
}
