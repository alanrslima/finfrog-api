import {
  CategoryQuery,
  ListCategoryInput,
  ListCategoryOutput,
} from "../../../application/contract/query/category-query";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class CategoryMysqlQuery implements CategoryQuery {
  async list(input: ListCategoryInput): Promise<ListCategoryOutput> {
    const [count] = await mysqlDatabase.query({
      sql: `SELECT COUNT(*) AS total FROM category WHERE user_id = ?`,
      values: [input.userId],
    });
    const sql = `SELECT id, name FROM category WHERE user_id = ?`;
    const data = await mysqlDatabase.query({
      sql,
      values: [input.userId],
    });
    return { pages: count.total, data };
  }
}
