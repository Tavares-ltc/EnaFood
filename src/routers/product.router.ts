import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter
.get("/products", productController.listProducts)

export { productRouter };
