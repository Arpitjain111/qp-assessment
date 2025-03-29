import sequelize from "../config/sequelize";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";

/**
 * @description Initializes the database by adding models and syncing them.
 * - It registers all models with Sequelize.
 * - It synchronizes the database schema.
 */
async function syncDatabase() {
  try {
    await sequelize.addModels([Product, Order, OrderItem]);
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

syncDatabase();
