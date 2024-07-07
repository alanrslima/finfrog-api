import { DeleteCategoryUseCase } from "../../../../application/use-case/category/delete-category-use-case";
import { CategoryMysqlRepository } from "../../../../infra/repository/mysql/category-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { DeleteCategoryController } from "../../../../presentation/controller/category/delete-category-controller";

export const deleteCategoryControllerFactory = (): Controller => {
  const categoryMysqlRepository = new CategoryMysqlRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(
    categoryMysqlRepository
  );
  const controller = new DeleteCategoryController(deleteCategoryUseCase);
  return controller;
};
