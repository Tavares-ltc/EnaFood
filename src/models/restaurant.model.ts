import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "../interfaces/IRestaurant";

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: Object, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
