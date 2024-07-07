import { type Router } from "express";
import { adaptRoute } from "../adapter/express-route-adapter";
import { auth } from "../middleware/auth";
import { createCategoryControllerFactory } from "../factory/controller/category/create-category-controller-factory";
import { listCategoriesControllerFactory } from "../factory/controller/category/list-categories-controller-factory";
import { updateCategoryControllerFactory } from "../factory/controller/category/update-category-controller-factory";
import { deleteCategoryControllerFactory } from "../factory/controller/category/delete-category-controller-factory";

export default (router: Router): void => {
  router.post("/category", auth, adaptRoute(createCategoryControllerFactory()));
  router.get("/category", auth, adaptRoute(listCategoriesControllerFactory()));
  router.put("/category", auth, adaptRoute(updateCategoryControllerFactory()));
  router.delete(
    "/category",
    auth,
    adaptRoute(deleteCategoryControllerFactory())
  );
};
