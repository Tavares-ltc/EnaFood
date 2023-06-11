import { Document } from "mongoose";
import { Address } from "./IAddress";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address: IAddress[];
}

interface IUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address: IAddress[];
}

export { IUser, IUserData };
