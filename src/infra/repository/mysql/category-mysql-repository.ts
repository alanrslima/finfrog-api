import { CategoryRepository } from "../../../application/contract/repository/category-repository";
import { Category } from "../../../domain/entity/category";
import { ResourceNotFoundError } from "../../../error/resource-not-found-error";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class CategoryMysqlRepository implements CategoryRepository {
  async getById(id: string): Promise<Category> {
    const sql = `SELECT id, name, user_id as userId FROM category WHERE id = ?`;
    const [data] = await mysqlDatabase.query({
      sql,
      values: [id],
    });
    if (!data) throw new ResourceNotFoundError();
    return Category.build(data);
  }
}
