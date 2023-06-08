import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  restaurant_id: { type: Schema.Types.ObjectId, required: true, index: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
