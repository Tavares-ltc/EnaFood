import { Document } from "mongoose";
import { Address } from "./IAddress";

export interface IRestaurant extends Document{
  name: string;
  email: string;
  address: Address;
  phone: string;
}
