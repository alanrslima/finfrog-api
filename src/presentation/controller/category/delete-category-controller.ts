import { DeleteCategoryUseCase } from "../../../application/use-case/category/delete-category-use-case";
import { Controller } from "../../contract/controller";
import { HttpResponse } from "../../contract/http-response";
import { noContent } from "../../helpers/http-helper";

export class DeleteCategoryController implements Controller {
  constructor(private readonly deleteCategoryUseCase: DeleteCategoryUseCase) {}

  async handle(params: any): Promise<HttpResponse<any>> {
    await this.deleteCategoryUseCase.execute(params);
    return noContent();
  }
}
