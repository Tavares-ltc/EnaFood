import { Document } from "mongoose";
import { IAddress } from "./IAddress";

interface IRestaurant extends Document {
  name: string;
  email: string;
  address: IAddress;
  phone: string;
}

interface IRestaurantData {
  name: string;
  email: string;
  address: IAddress;
  phone: string;
}

export { IRestaurant, IRestaurantData };
