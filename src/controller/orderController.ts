import { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { Product } from "../models/Product";
import sequelize from "../config/sequelize"; 

/**
 * @name Update Inventory
 * @description Updates the inventory levels of a product (Admin only).
 * @endpoint PATCH /api/products/:id/inventory
 * @headers { "role": "user" } 
 * @payload {
              "items": [
                { "product_id": 3, "quantity": 2 },
                { "product_id": 2, "quantity": 3 }
              ]
            }
 */
export const createOrder = async (req: Request, res: Response) => {
  const role = req.headers["role"]; 
  if (role !== "user") {
    return res.status(403).json({ message: "Access denied. Users only." });
  }

  const { items } = req.body; 

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid order items" });
  }

  const transaction = await sequelize.transaction(); 

  try {
    let totalAmount = 0;

    // Validate product availability and calculate total price
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction });

      if (!product || product.quantityAvailable < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Insufficient stock for product ID ${item.product_id}`,
        });
      }

      totalAmount += parseFloat(product.price.toString()) * item.quantity;
    }

    // Create order
    const order = await Order.create(
      { total_amount: totalAmount, status: "completed" },
      { transaction }
    );

    // Create order items & update inventory
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction });

      if (product) {
        await OrderItem.create(
          {
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price,
          },
          { transaction }
        );

        // Reduce stock
        await product.update(
          { quantityAvailable: product.quantityAvailable - item.quantity },
          { transaction }
        );
      }
    }

    await transaction.commit(); 
    return res.status(201).json({ message: "Order placed successfully", order_id: order.id });
  } catch (error) {
    await transaction.rollback();
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
