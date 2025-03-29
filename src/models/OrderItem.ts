import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Order } from "./Order";
import { Product } from "./Product";

/* 
  Table: order_items
  Description: Stores items associated with an order.
  
  Columns:
  - id (INTEGER, Auto-increment, Primary Key)
  - order_id (INTEGER, NOT NULL, Foreign Key → orders.id) 
  - product_id (INTEGER, NOT NULL, Foreign Key → products.id)
  - quantity (INTEGER, NOT NULL) → Quantity of the product in the order.
  - price (DECIMAL(10,2), NOT NULL) → Price of the product at the time of order.

  Relationships:
  - Many `OrderItem` → One `Order`
  - Many `OrderItem` → One `Product`
*/

@Table({ tableName: "order_items", timestamps: false })
export class OrderItem extends Model {
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  order_id!: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price!: number;
}
