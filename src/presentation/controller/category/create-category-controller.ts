import { CreateCategoryUseCase } from "../../../application/use-case/category/create-category-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { created } from "../../helpers/http-helper";

export class CreateCategoryController implements Controller {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.createCategoryUseCase.execute(params);
    return created(response);
  }
}
