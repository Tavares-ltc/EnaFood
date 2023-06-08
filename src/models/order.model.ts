import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/IOrder";

const OrderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  products: { type: Array, required: true },
  payment_method: { type: String, required: true },
  status: { type: String, default: "creating" },
  delivery_address: { type: Object, required: true },
  total_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
