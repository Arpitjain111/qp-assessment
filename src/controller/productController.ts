import { Request, Response } from "express";
import { Product } from "../models/Product";


/**
 * @name Create Product
 * @description Creates a new grocery product (Admin only).
 * @endpoint POST /api/products
 * @headers { "role": "admin" } (Required: Only admins can create a product)
 * @payload { 
 *   "name": "Product Name",
 *   "description": "Product Description",
 *   "price": 100,
 *   "quantityAvailable": 10 
 * }
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const role = req.headers["role"]; 

    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, description, price, quantityAvailable } = req.body;

    if (!name || !price || quantityAvailable === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({ name, description, price, quantityAvailable });
    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @name Get All Products
 * @description Retrieves all available grocery products.
 * @endpoint GET /api/products
 */
export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @name Update Product
 * @description Updates product details (Admin only).
 * @endpoint PUT /api/products/:id
 * @headers { "role": "admin" } (Required: Only admins can update a product)
 * @payload { 
 *   "name": "Updated Name",
 *   "description": "Updated Description",
 *   "price": 200
 * }
 */
export const updateProduct = async (req: Request, res: Response) => {
    try {
      const role = req.headers["role"]; 
      if (role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const { id } = req.params;
      const { name, description, price } = req.body;
  
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      await product.update({ name, description, price });
  
      return res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  /**
 * @name Delete Product
 * @description Deletes a product (Admin only).
 * @endpoint DELETE /api/products/:id
 * @headers { "role": "admin" } (Required: Only admins can delete a product)
 */
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const role = req.headers["role"]; 
      if (role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const { id } = req.params;
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      await product.destroy();
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


/**
 * @name Update Inventory
 * @description Updates the inventory levels of a product (Admin only).
 * @endpoint PATCH /api/products/:id/inventory
 * @headers { "role": "admin" } (Required: Only admins can update inventory)
 * @payload { "quantityAvailable": 30 }
 */
export const updateInventory = async (req: Request, res: Response) => {
  const role = req.headers["role"]; 
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const { id } = req.params; 
  const { quantityAvailable } = req.body; 

  if (quantityAvailable === undefined || quantityAvailable < 0) {
    return res.status(400).json({ message: "Invalid inventory quantity" });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update stock
    await product.update({ quantityAvailable });

    return res.status(200).json({
      message: "Inventory updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
