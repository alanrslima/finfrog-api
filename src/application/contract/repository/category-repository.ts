import { Category } from "../../../domain/entity/category";

export interface CategoryRepository {
  create(category: Category): Promise<void>;
  update(category: Category): Promise<void>;
  delete(category: Category): Promise<void>;
  getById(id: string): Promise<Category>;
}
