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

  async update(category: Category): Promise<void> {
    const sql = `UPDATE category SET name = ? WHERE id = ?`;
    await mysqlDatabase.query({
      sql,
      values: [category.getName(), category.getId()],
    });
  }

  async delete(category: Category): Promise<void> {
    const sql = `DELETE FROM category WHERE id = ?`;
    await mysqlDatabase.query({ sql, values: [category.getId()] });
  }

  async create(category: Category): Promise<void> {
    const sql = `INSERT INTO category (id, name, user_id) VALUES (?,?,?)`;
    await mysqlDatabase.query({
      sql,
      values: [category.getId(), category.getName(), category.getUserId()],
    });
  }
}
