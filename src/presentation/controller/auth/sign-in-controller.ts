import { SignInUseCase } from "../../../application/use-case/auth/sign-in-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class SignInController implements Controller {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.signInUseCase.execute(params);
    return ok(response);
  }
}
