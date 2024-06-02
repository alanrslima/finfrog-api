import mysql, { ConnectionOptions, Pool } from "mysql2/promise";
import { env } from "../../main/config/env";

type QueryOptions = {
  sql: string;
  values?: any | any[] | { [param: string]: any };
  namedPlaceholders?: boolean;
};

class MysqlDatabase {
  private accessOptions: ConnectionOptions;
  private pool: Pool;

  constructor() {
    this.accessOptions = {
      user: env.mysqlUser,
      database: env.mysqlDatabase,
      password: env.mysqlPassword,
      port: Number(env.mysqlPort),
      host: env.mysqlHost,
    };
    this.pool = mysql.createPool(this.accessOptions);
  }

  async query(props: QueryOptions) {
    const connection = await this.pool.getConnection();
    const [response] = await connection.query(props);
    connection.release();
    return response as any[];
  }
}

const mysqlDatabase = new MysqlDatabase();
export { mysqlDatabase };
