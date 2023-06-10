import { Document } from "mongoose";

interface IProducts {
  product_id: string;
  amount: number;
}

interface IOrder extends Document {
  user_id: string;
  products: IProducts[];
  payment_method: "credit" | "debit" | "vale-refeicao" | "pix";
  status: "completed" | "on delivery" | "canceled" | "creating";
  delivery_address: object;
  total_price: number;
  date: Date;
}

interface IOrderData {
  user_id: string;
  products: IProducts[];
  payment_method: "credit" | "debit" | "vale-refeicao" | "pix";
  status: "completed" | "on delivery" | "canceled" | "creating";
  delivery_address: object;
  total_price: number;
  date: Date;
}

export { IOrder, IProducts, IOrderData };
