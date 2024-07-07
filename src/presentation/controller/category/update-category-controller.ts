import { UpdateCategoryUseCase } from "../../../application/use-case/category/update-category-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { created } from "../../helpers/http-helper";

export class UpdateCategoryController implements Controller {
  constructor(private readonly updateCategoryUseCase: UpdateCategoryUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    const response = await this.updateCategoryUseCase.execute(params);
    return created(response);
  }
}
