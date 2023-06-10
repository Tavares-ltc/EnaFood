import { IOrderData, IOrderStatus } from "../interfaces/IOrder.js";
import Order from "../models/order.model.js";

const pageSize = 50;

async function createOrder(order: Omit<IOrderData, "date">) {
  const orderCreated = await Order.create(order);
  return orderCreated;
}

async function getOrders(userId: string, status: string, pageNumber: number) {
  const orders = await Order.find({ user_id: userId, status })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .exec();
  return orders;
}

async function getOrderById(orderId: string) {
  const order = await Order.findOne({ _id: orderId });
  return order;
}

async function changeOrderStatus(orderId: string, status: IOrderStatus) {
  const orderDocument = await Order.findOne({ _id: orderId });
  orderDocument.status = status;
  await orderDocument.save();
  return orderDocument;
}

async function editOrder(orderId: string, order: Omit<IOrderData, "date">) {
  const orderDocument = await getOrderById(orderId);
  Object.assign(orderDocument, order);
  await orderDocument.save();
  return orderDocument;
}

const orderRepository = {
  createOrder,
  getOrders,
  getOrderById,
  editOrder,
  changeOrderStatus,
};

export default orderRepository;
