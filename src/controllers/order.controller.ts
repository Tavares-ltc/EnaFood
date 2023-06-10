import { Request, Response } from "express";
import {
  badRequestResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
} from "../helpers/response.helper.js";
import orderService from "../services/order.service.js";
import { IOrderData } from "../interfaces/IOrder.js";
import { ORDER_STATUS } from "../helpers/order.helper.js";

async function createOrder(req: Request, res: Response) {
  const { userId } = res.locals;
  const { products, payment_method, delivery_address } = req.body;
  const order: Omit<IOrderData, "status" | "total_price" | "date"> = {
    products,
    payment_method,
    delivery_address,
    user_id: userId,
  };
  try {
    const orderCreated = await orderService.createOrder(order);
    okResponse(res, orderCreated);
  } catch (error) {
    if (error.name === "RequestError") {
      return badRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}

async function listOrders(req: Request, res: Response) {
  const { userId } = res.locals;
  const { page, status } = req.query;
  if (typeof status !== "string") {
    return badRequestResponse(res);
  }
  const pageNumber = Number(page);
  try {
    const orderList = await orderService.getOrders(userId, status, pageNumber);
    okResponse(res, orderList);
  } catch (error) {
    if (error.name === "requestError") {
      return badRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}

async function editOrder(req: Request, res: Response) {
  const { userId } = res.locals;
  const { orderId } = req.params;
  const { products, payment_method, delivery_address } = req.body;
  const newOrder: Omit<IOrderData, "status" | "total_price" | "date"> = {
    products,
    payment_method,
    delivery_address,
    user_id: userId,
  };

  try {
    const editedOrder = await orderService.editOrder(userId, orderId, newOrder);
    okResponse(res, editedOrder);
  } catch (error) {
    if (error.name === "requestError") {
      return unauthorizedRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}

async function changeStatusToCreated(req: Request, res: Response) {
  const { userId } = res.locals;
  const { orderId } = req.params;

  try {
    const editedOrder = await orderService.changeOrderStatus(
      userId,
      orderId,
      ORDER_STATUS.CREATED
    );
    okResponse(res, editedOrder);
  } catch (error) {
    if (error.name === "requestError") {
      return unauthorizedRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}

const orderController = {
  createOrder,
  listOrders,
  editOrder,
  changeStatusToCreated,
};

export default orderController;
