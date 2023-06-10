import { IOrderData } from "../interfaces/IOrder.js";
import Order from "../models/order.model.js";

const pageSize = 50;

async function createOrder(order: Omit<IOrderData, "date">) {
  const orderCreated = await Order.create(order);
  return orderCreated;
}

async function getOrders(user_id: string, status: string, pageNumber: number) {
  const orders = await Order.find({ user_id, status })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .exec();
  return orders;
}

const orderRepository = {
  createOrder,
  getOrders,
};

export default orderRepository;
