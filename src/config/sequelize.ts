import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "GroceryDB",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
  logging: false,
  models: [__dirname + "/../models"], 
});

export default sequelize;
