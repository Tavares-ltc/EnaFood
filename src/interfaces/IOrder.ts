import { Document } from "mongoose";
import { ORDER_STATUS } from "../helpers/order.helper";

interface IProducts {
  product_id: string;
  amount: number;
}

interface IOrder extends Document {
  user_id: string;
  products: IProducts[];
  payment_method: "credit" | "debit" | "vale-refeicao" | "pix";
  status:
    | "creating"
    | "waiting_for_approval"
    | "on_delivery"
    | "completed"
    | "canceled";
  delivery_address: object;
  total_price: number;
  date: Date;
}

interface IOrderData {
  user_id: string;
  products: IProducts[];
  payment_method: "credit" | "debit" | "vale-refeicao" | "pix";
  status:
    | "creating"
    | "waiting_for_approval"
    | "on_delivery"
    | "completed"
    | "canceled";
  delivery_address: object;
  total_price: number;
  date: Date;
}

type IOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export { IOrder, IProducts, IOrderData, IOrderStatus };
