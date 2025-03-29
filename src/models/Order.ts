import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { OrderItem } from "./OrderItem";


/* 
  Table: orders
  Description: Stores details of user orders.
  
  Columns:
  - id (INTEGER, Auto-increment, Primary Key)
  - total_amount (DECIMAL(10,2), NOT NULL) → Total price of the order.
  - status (ENUM ["completed"], NULLABLE) → Status of the order.

  Relationships:
  - One `Order` → Many `OrderItem`
*/

@Table({ tableName: "orders", timestamps: false })
export class Order extends Model {
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  total_amount!: number;

  @Column({ type: DataType.ENUM("completed"), allowNull: true })
  status!: string;

  @HasMany(() => OrderItem)
  orderItems!: OrderItem[];
}
