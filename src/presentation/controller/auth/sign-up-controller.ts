import { SignUpUseCase } from "../../../application/use-case/auth/sign-up-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { created } from "../../helpers/http-helper";

export class SignUpController implements Controller {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.signUpUseCase.execute(params);
    return created(response);
  }
}
