import { Router } from "express";
import { validateOrderCreationData } from "../middlewares/validateCreateOrder.middleware.js";
import checkAuthorization from "../middlewares/auth.middleware.js";
import orderController from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter
.get("/order", checkAuthorization, orderController.listOrders)
.post("/order", checkAuthorization, validateOrderCreationData, orderController.createOrder)
export { orderRouter };

