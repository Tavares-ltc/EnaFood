import { Router } from "express";
import { validateOrderCreationData } from "../middlewares/validateCreateOrder.middleware.js";
import checkAuthorization from "../middlewares/auth.middleware.js";
import orderController from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter
  .get("/order", checkAuthorization, orderController.listOrders)
  .post(
    "/order",
    checkAuthorization,
    validateOrderCreationData,
    orderController.createOrder
  )
  .put(
    "/order/:orderId",
    checkAuthorization,
    validateOrderCreationData,
    orderController.editOrder
  )
  .patch(
    "/order/:orderId/created",
    checkAuthorization,
    orderController.changeStatusToCreated
  );
export { orderRouter };
