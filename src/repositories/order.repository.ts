import { IOrderData } from "../interfaces/IOrder.js";
import Order from "../models/order.model.js";

async function createOrder(order: Omit<IOrderData, "date">) {
  return await Order.create(order);
}

const orderRepository = {
  createOrder,
};

export default orderRepository;
