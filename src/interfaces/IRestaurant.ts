import { Document } from "mongoose";
import { Address } from "./IAddress";

interface IRestaurant extends Document {
  name: string;
  email: string;
  address: Address;
  phone: string;
}

export { IRestaurant };
