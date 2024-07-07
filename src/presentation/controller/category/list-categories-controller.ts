import { LoggedUserDTO } from "../../../application/contract/dto/logged-user-dto";
import { CategoryQuery } from "../../../application/contract/query/category-query";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { ok } from "../../helpers/http-helper";

export class ListCategoriesController implements Controller {
  constructor(private readonly categoryQuery: CategoryQuery) {}

  async handle(params: ParamsProps): Promise<HttpResponse<any>> {
    const response = await this.categoryQuery.list({ userId: params.user.id });
    return ok(response);
  }
}

type ParamsProps = {
  user: LoggedUserDTO;
};
