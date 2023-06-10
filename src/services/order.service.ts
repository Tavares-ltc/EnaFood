import { requestError } from "../errors/request.error.js";
import { ORDER_STATUS } from "../helpers/order.helper.js";
import {IOrderData, IProducts } from "../interfaces/IOrder.js";
import orderRepository from "../repositories/order.repository.js";
import productRepository from "../repositories/product.repository.js";

async function createOrder(
  orderData: Omit<IOrderData, "status" | "total_price" | "date" >
) {
  const products = orderData.products;
  const totalPrice = await calculateTotalPrice(products)
  const order = {
    ...orderData,
    status: ORDER_STATUS.CREATING,
    total_price: totalPrice
  };
  return await orderRepository.createOrder(order);
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

const orderService = {
  createOrder
}

export default orderService