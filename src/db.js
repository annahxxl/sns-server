import "dotenv/config.js";
import sequelize from "sequelize";

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const db = new sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});
