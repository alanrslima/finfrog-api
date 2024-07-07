import {
  CategoryQuery,
  ListCategoryInput,
  ListCategoryOutput,
} from "../../../application/contract/query/category-query";
import { mysqlDatabase } from "../../mysql/mysql-connection";

export class CategoryMysqlQuery implements CategoryQuery {
  async list(input: ListCategoryInput): Promise<ListCategoryOutput> {
    const sql = `SELECT id, name FROM category WHERE user_id = ?`;
    return await mysqlDatabase.query({
      sql,
      values: [input.userId],
    });
  }
}
