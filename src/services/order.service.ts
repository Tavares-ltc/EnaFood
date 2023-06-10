import { requestError } from "../errors/request.error.js";
import { ORDER_STATUS } from "../helpers/order.helper.js";
import { IOrderData, IOrderStatus, IProducts } from "../interfaces/IOrder.js";
import orderRepository from "../repositories/order.repository.js";
import productRepository from "../repositories/product.repository.js";

async function createOrder(
  orderData: Omit<IOrderData, "status" | "total_price" | "date">
) {
  const products = orderData.products;
  const totalPrice = await calculateTotalPrice(products);
  const order = {
    ...orderData,
    status: ORDER_STATUS.CREATING,
    total_price: totalPrice,
  };
  return await orderRepository.createOrder(order);
}
async function getOrders(
  userId: string,
  status: string = ORDER_STATUS.CREATING,
  page: number = 1
) {
  if (!isOrderStatusValid(status)) {
    throw requestError;
  }
  const orders = await orderRepository.getOrders(userId, status, page);
  return orders;
}

async function editOrder(
  userId: string,
  orderId: string,
  orderData: Omit<IOrderData, "status" | "total_price" | "date">
) {
  const orderRequested = await orderRepository.getOrderById(orderId);
  if (orderRequested.user_id != userId) {
    throw requestError;
  }

  const products = orderData.products;
  const totalPrice = await calculateTotalPrice(products);
  const order = {
    ...orderData,
    status: ORDER_STATUS.CREATING,
    total_price: totalPrice,
  };

  const newOrder = await orderRepository.editOrder(orderId, order);
  return newOrder;
}

async function changeOrderStatus(
  userId: string,
  orderId: string,
  status: string
) {
  if (!isOrderStatusValid(status)) {
    throw requestError;
  }
  const orderRequested = await orderRepository.getOrderById(orderId);
  if (orderRequested.user_id != userId) {
    throw requestError;
  }

  const orderEdited = await orderRepository.changeOrderStatus(orderId, status);
  return orderEdited;
}

async function calculateTotalPrice(products: IProducts[]) {
  let totalPrice = 0;
  const requests = products.map(async (product) => {
    const productId = product.product_id;
    const productData = await productRepository.getProductById(productId);
    if (!productData) {
      throw requestError;
    }
    totalPrice += productData.price * product.amount;
  });
  await Promise.all(requests);
  return totalPrice;
}

function isOrderStatusValid(status: string): status is IOrderStatus {
  return Object.values(ORDER_STATUS).includes(status as IOrderStatus);
}

const orderService = {
  createOrder,
  getOrders,
  editOrder,
  changeOrderStatus,
};

export default orderService;
