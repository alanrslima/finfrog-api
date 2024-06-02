// import * as dotenv from "dotenv";
// dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? 3001,
  jwtSecret: process.env.JWT_SECRET ?? "tj67O==5H",
  mysqlHost: process.env.DB_HOST,
  mysqlUser: process.env.DB_USER,
  mysqlPassword: process.env.DB_PASSWORD,
  mysqlDatabase: process.env.DB_NAME,
  mysqlPort: Number(process.env.DB_PORT),
};
