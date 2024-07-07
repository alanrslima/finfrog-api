import { CreateCategoryUseCase } from "../../../../application/use-case/category/create-category-use-case";
import { CategoryMysqlRepository } from "../../../../infra/repository/mysql/category-mysql-repository";
import { Controller } from "../../../../presentation/contract/controller";
import { CreateCategoryController } from "../../../../presentation/controller/category/create-category-controller";

export const createCategoryControllerFactory = (): Controller => {
  const categoryMysqlRepository = new CategoryMysqlRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryMysqlRepository
  );
  const controller = new CreateCategoryController(createCategoryUseCase);
  return controller;
};
