import { Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  restaurant_id: string;
}

export { IProduct };
