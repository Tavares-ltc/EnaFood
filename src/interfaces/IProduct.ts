import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  restaurant_id: string;
}
