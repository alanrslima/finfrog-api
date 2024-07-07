import { CategoryRepository } from "../../../application/contract/repository/category-repository";
import { Category } from "../../../domain/entity/category";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";

export class CategoryMemoryRepository implements CategoryRepository {
  private data: Category[];

  constructor(mock?: Category[]) {
    this.data = mock || [];
  }

  async getById(id: string): Promise<Category> {
    const category = this.data.find((category) => category.getId() === id);
    if (!category) throw new ResourceNotFoundError();
    return category;
  }

  getData() {
    return this.data;
  }
}
