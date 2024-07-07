import type { Knex } from "knex";
import { env } from "./src/main/config/env";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: env.mysqlHost,
      user: env.mysqlUser,
      password: env.mysqlPassword,
      database: env.mysqlDatabase,
      port: env.mysqlPort,
    },
    migrations: {
      directory: "migrations",
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      host: env.mysqlHost,
      user: env.mysqlUser,
      password: env.mysqlPassword,
      database: env.mysqlDatabase,
      port: env.mysqlPort,
    },
    migrations: {
      directory: "migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: env.mysqlHost,
      user: env.mysqlUser,
      password: env.mysqlPassword,
      database: env.mysqlDatabase,
      port: env.mysqlPort,
    },
    migrations: {
      directory: "migrations",
    },
  },
};

module.exports = config;
