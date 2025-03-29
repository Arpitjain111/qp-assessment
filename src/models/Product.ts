import { Table, Column, Model, DataType } from "sequelize-typescript";


/* 
  Table: products
  Description: Stores grocery items available for purchase.
  
  Columns:
  - id (INTEGER, Auto-increment, Primary Key)
  - name (STRING, NOT NULL) → Name of the product.
  - description (TEXT, NULL) → Optional detailed description of the product.
  - price (DECIMAL(10,2), NOT NULL) → Price per unit of the product.
  - quantityAvailable (INTEGER, NOT NULL, Default: 0) → Available stock.
  
  Relationships:
  - This table is referenced in `order_items` (product_id)  
*/

@Table({ tableName: "products", timestamps: false })
export class Product extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  quantityAvailable!: number;
} 
