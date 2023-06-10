import { Request, Response } from "express";
import { badRequestResponse, okResponse, serverErrorResponse } from "../helpers/response.helper.js";
import orderService from "../services/order.service.js";
import { IOrderData } from "../interfaces/IOrder.js";

async function createOrder(req: Request, res: Response) {
 const { userId } = res.locals;
 const { products, payment_method, delivery_address } = req.body;
 const order : Omit<IOrderData, "status" | "total_price" | "date" > = {products, payment_method, delivery_address, user_id: userId}
  try {
    const orderCreated = await orderService.createOrder(order);
    okResponse(res, orderCreated);
  } catch (error) {
    if(error.name === "RequestError"){
        return badRequestResponse(res)
    }
    serverErrorResponse(res);
  }
}

const orderController = {
    createOrder
}

export default orderController