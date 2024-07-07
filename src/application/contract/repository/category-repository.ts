import { Category } from "../../../domain/entity/category";

export interface CategoryRepository {
  getById(id: string): Promise<Category>;
}
