import { UpdateCategoryUseCase } from "../../../../application/use-case/category/update-category-use-case";
import { CategoryMysqlRepository } from "../../../../infra/repository/mysql/category-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { UpdateCategoryController } from "../../../../presentation/controller/category/update-category-controller";

export const updateCategoryControllerFactory = (): Controller => {
  const categoryMysqlRepository = new CategoryMysqlRepository();
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryMysqlRepository
  );
  const controller = new UpdateCategoryController(updateCategoryUseCase);
  return controller;
};
