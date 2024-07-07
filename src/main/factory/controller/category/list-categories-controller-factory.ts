import { CategoryMysqlQuery } from "../../../../infra/query/mysql/category-mysql-query";
import { Controller } from "../../../../presentation/contract/controller";
import { ListCategoriesController } from "../../../../presentation/controller/category/list-categories-controller";

export const listCategoriesControllerFactory = (): Controller => {
  const categoryMysqlQuery = new CategoryMysqlQuery();
  const controller = new ListCategoriesController(categoryMysqlQuery);
  return controller;
};
