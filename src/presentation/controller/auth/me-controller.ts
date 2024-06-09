import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class MeController implements Controller {
  async handle(params: any): Promise<HttpResponse<any>> {
    return ok({ user: params.user });
  }
}
