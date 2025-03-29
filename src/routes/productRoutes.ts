import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateInventory, updateProduct } from "../controller/productController";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id/inventory", updateInventory);

export default router;
