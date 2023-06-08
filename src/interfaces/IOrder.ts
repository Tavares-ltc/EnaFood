import { Document } from "mongoose";

interface Products {
  product_id: string;
  ammount: number;
}

interface IOrder extends Document {
  user_id: string;
  products: Products[];
  payment_method: "credit" | "debit" | "vale-refeicao" | "pix";
  status: "completed" | "on delivery" | "canceled" | "creating";
  delivery_address: object;
  total_price: number;
  date: Date;
}

export { IOrder };
